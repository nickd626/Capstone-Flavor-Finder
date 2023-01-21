import React from "react";
import axios from "axios"

const Header = (props) => {
  const logMeOut = () => {
    axios({
      method: "POST",
      url: "/logout",
    })
      .then((response) => {
        props.token();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  return (
    <header className="App-header">
      <button onClick={logMeOut}>Logout</button>
    </header>
  );
};

export default Header;
