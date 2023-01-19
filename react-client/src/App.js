import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Random from "./components/Random/Random";
import FindByIngredients from "./components/FindByIngredients/FindByIngredients";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";

// TODO: FILL NAVBAR WITH PROPER LINKS
// TODO: MATCH STYLES IN RANDOM.JSX => FINDBYINGREDIENTS.JSX
// TODO: LOGIN FUNCTIONALITY (JWT?)

const App = () => {
  const [currentUserUsername, setCurrentUserUsername] = useState(null);
  const [currentUserAllergies, setCurrentUserAllergies] = useState(null);

  return (
    <BrowserRouter>
      <div>
        <Navbar
          currentUserUsername={currentUserUsername}
          currentUserAllergies={currentUserAllergies}
        />
        <Routes>
          <Route
            path="/login"
            element={
              <LogIn
                onLogInUsername={setCurrentUserUsername}
                onLogInAllergies={setCurrentUserAllergies}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/findByIngredients"
            element={
              <FindByIngredients
                currentUserUsername={currentUserUsername}
                currentUserAllergies={currentUserAllergies}
              />
            }
          />
          <Route
            path="/random"
            element={
              <Random
                currentUserUsername={currentUserUsername}
                currentUserAllergies={currentUserAllergies}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
