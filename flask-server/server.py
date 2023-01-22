from flask import Flask, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime, timedelta, timezone
import requests
import os
import json


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
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt = JWTManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db, compare_type=True)
login_manager = LoginManager()
login_manager.init_app(app)

if __name__ == '__main__':
    app.run(debug=True)


@app.route('/findByIngredients/<ingredients>', methods=['GET', 'POST'])
def findByIngredients(ingredients):
    # ! REMEMBER TO REMOVE &number
    findByIngredients = f'https://api.spoonacular.com/recipes/findByIngredients?{key}&ingredients={ingredients}&ranking=1&number=5'
    getFindByIngredients = requests.get(findByIngredients)
    return getFindByIngredients.text


@app.route('/findById/<int:id>', methods=['GET', 'POST'])
def findById(id):
    findById = f'https://api.spoonacular.com/recipes/{id}/information?{key}'
    getFindById = requests.get(findById)
    return getFindById.text


@app.route('/random')
@jwt_required()
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


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()['exp']
        now = datetime.now()
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data['access_token'] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response


@app.post('/token')
def create_token():
    data = request.get_json()
    print(data)
    user = User.query.filter_by(username=data['username']).first()
    try:
        if user.password == data['password']:
            print('passed if statement')
            access_token = create_access_token(identity=data['username'])
            return make_response(({'access_token': access_token, 'success': True}), 200)
        else:
            return make_response(({'message': 'Incorrect password', 'success': False}), 401)
    except:
        return make_response(({'message': 'User does not exist', 'success': False}), 401)


@app.post('/logout')
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

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

    def toDict(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'password': self.password,
        }
