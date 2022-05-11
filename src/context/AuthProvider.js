import React, { createContext, useContext, useReducer } from 'react';

export const AuthContext = createContext();

const userData = localStorage.getItem("user");
const initialState = {
    user: userData ? JSON.parse(userData) : null
};

export const actions = {
    HANDLE_USER: "handleUser"
};

const reducer = (state, action) => {
    if (action) {
        switch (action.payload) {
            case actions.HANDLE_USER:
                return {
                    ...state,
                    user: action.data
                }
            default:
                return state;
        }
    }
    return state;
};


export const AuthProvider = ({children}) => {
    let state = initialState;

    return (
        <AuthContext.Provider value={useReducer(reducer, state)}>
            {children}
        </AuthContext.Provider>
    )
};

export const useStateValue = () => useContext(AuthContext);