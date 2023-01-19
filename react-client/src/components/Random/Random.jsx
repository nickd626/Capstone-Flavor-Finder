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
      {data.recipes &&
        data.recipes.map((recipe) => (
          <div key={recipe.id}>
            <p>{recipe.title}</p>
            <p>Likes: {recipe.aggregateLikes}</p>
          </div>
        ))}
    </div>
  );
};

export default Random;