import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import api from "../config/api";
import { actions, useStateValue } from "../context/AuthProvider";
import errorDisplayed from "../config/error";

const EXPLORE_URL_FRONTEND = "/quizzes";

const useAuth = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const login = async (values, onError) => {
    try {
      const response = await axios.post(
        api.login,
        JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response.data.token;
      const { userId } = response.data;

      const userData = {
        userId,
        token: accessToken,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      dispatch({
        payload: actions.HANDLE_USER,
        data: userData,
      });

      navigate(EXPLORE_URL_FRONTEND);
    } catch (error) {
      if (typeof onError === "function") {
        if (!error.response) {
          onError(errorDisplayed.server);
        } else if (error.response.status === 401) {
          onError(errorDisplayed.invalidCredentials);
        }
      }
    }
  };

  const logout = () => {
    localStorage.clear("user");

    dispatch({
      payload: actions.HANDLE_USER,
      data: null,
    });
    navigate("/");
  };

  return {
    user,
    login,
    logout,
  };
};

export default useAuth;
