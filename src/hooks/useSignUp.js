import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import api from "../config/api";
import errorDisplayed from "../config/error";
/* eslint-disable no-unused-vars */

const LOGIN_URL_FRONTEND = "/";

const useSignUp = () => {
  const navigate = useNavigate();

  const signup = async (values, onError) => {
    try {
      const response = await axios.post(
        api.signup,
        JSON.stringify({
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      navigate(LOGIN_URL_FRONTEND);
    } catch (error) {
      if (typeof onError === "function") {
        if (!error.response) {
          onError(errorDisplayed.server);
        } else if (error.response.status === 400) {
          onError(errorDisplayed.existingAccount);
        }
      }
    }
  };

  return {
    signup,
  };
};

export default useSignUp;
