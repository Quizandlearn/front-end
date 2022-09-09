import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";
import errorDisplayed from "../config/error";

const useChangeConnectedUser = () => {
  const { user } = useAuth();
  const id = user.userId;

  const sendChangedUserData = async (values, onError) => {
    try {
      const response = await axios.put(`${api.user}/${id}`, JSON.stringify({
        name: values.name,
        surname: values.surname,
        email: values.email,
      }), {
        headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
        withCredentials: true
      });
      console.log(response);
      console.log(JSON.stringify(response));
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

  return { sendChangedUserData };
};

export default useChangeConnectedUser;