import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import api from "../config/api";

const LOGIN_URL_FRONTEND = "/";

const useSignUp = () => {
  const navigate = useNavigate();

  const signup = async (values, showServerError, showExistingAccountError) => {
    try {
      await axios.post(
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
      if (!error.response) {
        showServerError();
      } else if (error.response.status === 400) {
        showExistingAccountError();
      }
    }
  };

  return {
    signup,
  };
};

export default useSignUp;
