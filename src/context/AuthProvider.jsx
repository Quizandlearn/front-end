import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

// this function creates and returns a react context object
export const AuthContext = createContext();

// HOOK USE REDUCER to update state when user is connected
const userData = localStorage.getItem("user");

const initialState = {
  user: userData ? JSON.parse(userData) : null,
};

export const actions = {
  HANDLE_USER: "handleUser",
};

const reducer = (state, action) => {
  if (action) {
    switch (action.payload) {
      case actions.HANDLE_USER:
        return {
          ...state,
          user: action.data,
        };
      default:
        return state;
    }
  }
  return state;
};

/* AuthContext.Provider grants auth is made available to all descendent components
Here the provider value is provided by the reducer */
const AuthProvider = ({ children }) => {
  const state = initialState;
  return (
    <AuthContext.Provider value={useReducer(reducer, state)}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default AuthProvider;

export const useStateValue = () => useContext(AuthContext);
