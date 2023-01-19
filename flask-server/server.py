from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import requests
import os


# !!! GIT !!!

class Config():
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.environ.get(
        'SQLALCHEMY_TRACK_MODIFICATIONS')


key = os.environ.get('APIKey')

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')
cors = CORS(app)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db, compare_type=True)
login_manager = LoginManager()
login_manager.init_app(app)

if __name__ == '__main__':
    app.run(debug=True)

@login_required
@app.route('/findByIngredients/<ingredients>', methods=['GET', 'POST'])
def findByIngredients(ingredients):
    # ! REMEMBER TO REMOVE &number=3
    findByIngredients = f'https://api.spoonacular.com/recipes/findByIngredients?{key}&ingredients={ingredients}&ranking=2&number=3'
    getFindByIngredients = requests.get(findByIngredients)
    return getFindByIngredients.text

@login_required
@app.route('/findById/<int:id>', methods=['GET', 'POST'])
def findById(id):
    findById = f'https://api.spoonacular.com/recipes/{id}/information?{key}'
    getFindById = requests.get(findById)
    return getFindById.text

@login_required
@app.route('/random')
def random():
    randomRecipe = f'https://api.spoonacular.com/recipes/random?{key}'
    getRandomRecipe = requests.get(randomRecipe)
    return getRandomRecipe.text


@app.post('/register')
def createUser():
    data = request.get_json()
    new_user = User()
    new_user.fromDict(data)
    new_user.save()
    return make_response('User Created Successfully', 200)


@app.delete('/user/<int:id>')
def deleteUser(id):
    del_user = User.query.get(id)
    del_user.delete()
    return make_response('User Deleted Successfully', 200)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.get('/getUsers')
def getAllUsers():
    users = User.query.all()
    users = [user.toDict() for user in users]
    return make_response({'Users': users}, 200)


@app.post('/login')
def login():
    data = request.get_json()
    print(data)
    user = User.query.filter_by(username=data['username']).first()
    print('USER:', user.username)
    if user.password == data['password']:
        print('passed if statement')
        login_user(user)
        return make_response(({'username': current_user.username, 'allergies': current_user.allergies, 'success': True}), 200)
    else:
        return make_response(({'success': False}), 401)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return make_response('Logged out successfully'), 200


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    allergies = db.Column(db.String)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def fromDict(self, data):
        self.email = data['email']
        self.username = data['username']
        self.password = data['password']
        self.allergies = data['allergies']

    def toDict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'password': self.password,
            'allergies': self.allergies
        }
