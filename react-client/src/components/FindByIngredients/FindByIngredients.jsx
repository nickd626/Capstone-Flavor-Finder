import React, { useState } from "react";
import axios from "axios";
import "./FindByIngredients.css";

const FindByIngredients = (props) => {
  const [data, setData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    let ingredients = event.target[0].value.split(", ");
    ingredients = ingredients.join(",+");
    axios({
      method: "GET",
      url: `/findByIngredients/${ingredients}`,
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
    .then((response) => {
      const res = response.data
      res.access_token && props.setToken(res.access_token)
      setData(res)
    }).catch((error) => {
      console.log(error.response)
    })
      console.log(data)
  };


  // ! ALLERGY BADGES

  return (
    <div>
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search-box"
          name="ingredients"
          type="search"
          placeholder="Ingredients (apple, sugar, cinnamon, etc.)"
        />
        <button className="submit-btn" type="submit">
          Search
        </button>
      </form>
      <div className="recipe-block">
        {data &&
          data.map((recipe) => {
            return (
              <div className="recipe" key={recipe.id}>
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={recipe.image}
                        className="recipe-image img-fluid rounded-start"
                        alt="Recipe"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{recipe.title}</h5>
                        {/* <div
                          className="summary"
                          dangerouslySetInnerHTML={{
                            __html: summaries[recipe.id],
                          }}
                        /> */}
                        <div className="ingredient-list-wrapper">
                          <ul className="ingredient-list">
                            <div className="ingredient-wrapper">
                              <p>Uses:</p>
                              {recipe.usedIngredients &&
                                recipe.usedIngredients.map((ingredients) => (
                                  <li
                                    key={ingredients.name}
                                    className="used-ingredients"
                                  >
                                    {ingredients.name}
                                  </li>
                                ))}
                            </div>
                            <div className="ingredient-wrapper">
                              <p>Missing:</p>
                              {recipe.missedIngredients &&
                                recipe.missedIngredients.map((ingredients) => (
                                  <li
                                    key={ingredients.name}
                                    className="missing-ingredients"
                                  >
                                    {ingredients.name}
                                  </li>
                                ))}
                            </div>
                            <div className="ingredient-wrapper">
                              <p>Unused:</p>
                              {recipe.unusedIngredients &&
                                recipe.unusedIngredients.map((ingredients) => (
                                  <li
                                    key={ingredients.name}
                                    className="unused-ingredients"
                                  >
                                    {ingredients.name}
                                  </li>
                                ))}
                            </div>
                          </ul>
                        </div>
                        {/* <div>{this.renderAllergyBadges}</div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FindByIngredients;
