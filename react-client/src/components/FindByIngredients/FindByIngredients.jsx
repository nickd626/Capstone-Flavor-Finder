import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FindByIngredients.css";

const FindByIngredients = (props) => {
  const [data, setData] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [recipeLinks, setRecipeLinks] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
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
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setData(res);
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const findById = (recipe) => {
    fetch(`/findById/${recipe.id}`)
      .then((res) => res.json())
      .then((dataById) => {
        setSummaries((prevSummaries) => ({
          ...prevSummaries,
          [recipe.id]: dataById.summary,
        }));
        setRecipeLinks((prevRecipeLinks) => ({
          ...prevRecipeLinks,
          [recipe.id]: dataById.spoonacularSourceUrl,
        }));
      });
  };

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((recipe) => {
        findById(recipe);
      });
    }
  }, [data]);

  return (
    <div>
      <div className="main-logo">
        <img
          className="main-logo-img"
          src={require("../../images/logo.png")}
          width="50"
          height="50"
          alt="Logo"
        />
        <h1 className="main-logo-title">Flavor Finder</h1>
      </div>
      <form className="search" onSubmit={handleSubmit}>
        <h2 className="title">
          Find recipes that make use of what you already have!
        </h2>
        <div className="input-group">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Ingredients (apples, sugar, cinnamon, etc.)"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <button type="submit" className="btn btn-success">
            Find Recipes
          </button>
        </div>
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
                        <hr />
                        <div
                          className="summary"
                          dangerouslySetInnerHTML={{
                            __html: summaries[recipe.id],
                          }}
                        />
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
                      </div>
                      <div className="source-url">
                        <a href={recipeLinks[recipe.id]}>
                          <button className="btn btn-success">
                            Learn More
                          </button>
                        </a>
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
