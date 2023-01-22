import React, { useState, useEffect } from "react";

const Random = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/random")
      .then((resp) => {
        return resp.json();
      })

      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  // ROUTE AND JSX FUNCTIONAL, FILL WITH VALUES

  return (
    <div>
      <div>
        <button className="random-btn" onClick={useEffect} type="submit">
          Random Recipe
        </button>
      </div>
      <div className="recipe-block">
        {data && (
          <div className="recipe" key={data.id}>
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={data.image}
                    className="recipe-image img-fluid rounded-start"
                    alt="Recipe"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <div className="ingredient-list-wrapper">
                      <ul className="ingredient-list">
                        <div className="ingredient-wrapper">
                          <p>Uses:</p>
                          {data.usedIngredients &&
                            data.usedIngredients.map((ingredients) => (
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
                          {data.missedIngredients &&
                            data.missedIngredients.map((ingredients) => (
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
                          {data.unusedIngredients &&
                            data.unusedIngredients.map((ingredients) => (
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
                    <a href={data.spoonacularSourceUrl}>
                      <button className="btn btn-success">Learn More</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Random;
