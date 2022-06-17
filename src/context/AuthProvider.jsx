import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

// on crée un contexte = un changement d'état qui impactera tous les composants
export const AuthContext = createContext();

// on récupére l'utilisateur (son id + token)
const userData = localStorage.getItem("user");

// déclaration des states globales
const initialState = {
  // quand tu recharges la page, quand les données de l'utilisateur existent on les récupère du local storage
  // JSON.parse = transforme la chaine de caractère en objet
  // pas de ; car objet
  user: userData ? JSON.parse(userData) : null,
};

// pour eviter de mettre chaînes de caractère
export const actions = {
  HANDLE_USER: "handleUser",
};

// user : je veux le récupérer partout  du coup auth context
// HOOK USE REDUCER = méthode qui va permettre de mettre à jour l'"initial value" de l'état global de l'application
const reducer = (state, action) => {
  if (action) {
    switch (action.payload) {
      case actions.HANDLE_USER:
        return {
          // copie de l'état initial
          ...state,
          // ici on ve récupérer les données de l'utilisateur
          user: action.data,
        };
      default:
        return state;
    }
  }
  return state;
};

// provider : on stock state globales de l'appli
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
