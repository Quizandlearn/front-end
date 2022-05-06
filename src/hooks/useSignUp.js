import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { api } from "../config/api";
import { errorDisplayed } from "../config/error";

const LOGIN_URL_FRONTEND = "/";

export const useSignUp = () => {
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

      console.log(response.data);
      console.log(JSON.stringify(response));
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
