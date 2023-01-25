import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UseToken from "./components/UseToken";
import Random from "./components/Random/Random";
import FindByIngredients from "./components/FindByIngredients/FindByIngredients";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Search from "./components/Search/Search";

const App = () => {
  const { token, removeToken, setToken } = UseToken();

  return (
    <BrowserRouter>
      <div className="app">
        {!token && token !== "" && token !== undefined ? (
          <Routes>
            <Route
              exact
              path="/login"
              element={<LogIn setToken={setToken} />}
            ></Route>
            <Route
              exact
              path="/signup"
              element={<SignUp setToken={setToken} />}
            ></Route>
          </Routes>
        ) : (
          <>
            <Navbar token={removeToken} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <FindByIngredients token={token} setToken={setToken} />
                }
              ></Route>
              <Route
                exact
                path="/random"
                element={<Random token={token} setToken={setToken} />}
              ></Route>
              <Route
                exact
                path="/search"
                element={<Search token={token} setToken={setToken} />}
              ></Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
