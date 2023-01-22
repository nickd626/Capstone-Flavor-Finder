import React, { useState } from "react";
import axios from "axios"
import "./Random.css"

const Random = (props) => {
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    axios({
      method: "GET",
      url: '/random',
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
    }


    
  // ROUTE AND JSX FUNCTIONAL, FILL WITH VALUES

  return (
    <div>
      <div className="random-btn">
      <h2>Feeling Lucky?</h2>
        <button className="submit-btn btn btn-success" onClick={handleSubmit} type="submit">
          Random Recipe
        </button>
      </div>
      <div className="recipe-block">
        {data.recipes && (
          <div className="recipe" key={data.id}>
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={data.recipes[0].image}
                    className="recipe-image img-fluid rounded-start"
                    alt="Recipe"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{data.recipes[0].title}</h5>
                    <hr/>
                    <div
                          className="summary"
                          dangerouslySetInnerHTML={{
                            __html: data.recipes[0].summary,
                          }}
                        />
                    <div className="ingredient-list-wrapper">
                      <ul className="ingredient-list">
                        <div className="ingredient-wrapper">
                          <strong>Ingredients:</strong>
                          {data.recipes[0].extendedIngredients &&
                            data.recipes[0].extendedIngredients.map((ingredients) => (
                              <li
                                key={ingredients.name}
                                className="used-ingredients"
                              >
                                {ingredients.name}
                              </li>
                            ))}
                        </div>
                      </ul>
                    </div>
                  </div>
                  <div className="source-url">
                    <a href={data.recipes[0].spoonacularSourceUrl}>
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
