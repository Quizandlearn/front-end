import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ onlyPublic }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isValidToken = (token) => {
    // eslint-disable-next-line no-param-reassign
    token = jwt_decode(token);
    const now = Math.floor(Date.now() / 1000);

    if (token) {
      if (token.exp > now) {
        return true;
      }
    }
    logout();

    return false;
  };

  const userIsLogged = () => {
    if (user) {
      if (isValidToken(user.token)) {
        return true;
      }
    }
    return false;
  };

  if (onlyPublic) {
    if (!userIsLogged()) {
      return <Outlet />;
    }
    return <Navigate to="/quizzes" state={{ from: location }} replace />;
  }

  return userIsLogged() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

RequireAuth.propTypes = {
  onlyPublic: PropTypes.bool.isRequired
};

export default RequireAuth;
