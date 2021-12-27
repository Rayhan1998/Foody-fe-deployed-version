import React, { useState } from "react";
require("dotenv").config();

const Context = React.createContext();

function ContextProvider(props) {
  const [foodType, setFoodType] = useState("");
  const [foodCatigory, setFoodCatigory] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);
  const APIKEY = process.env.API_KEY;

  console.log(process.env);
  return (
    <Context.Provider
      value={{
        foodType,
        setFoodType,
        foodCatigory,
        setFoodCatigory,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        savedRecipes,
        setSavedRecipes,
        APIKEY
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
