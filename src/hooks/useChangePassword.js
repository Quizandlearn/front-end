import { useState } from "react";

import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";
/* eslint-disable no-unused-vars */

const useChangePassword = () => {
  const [responseStatus, setResponseStatus] = useState("");
  const { user } = useAuth();
  const id = user.userId;

  const changePassword = async (
    values,
    showInvalidCredentialsError,
    showServerError
  ) => {
    try {
      const response = await axios.put(
        `${api.user}/${id}/password`,
        JSON.stringify({
          password: values.currentPassword,
          newPassword: values.updatedConfirmedPassword,
        }),
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setResponseStatus({ responseStatus: response.status });
    } catch (error) {
      if (!error.response) {
        showServerError();
      } else if (error.response.status === 401) {
        showInvalidCredentialsError();
      }
    }
  };

  return {
    changePassword,
  };
};

export default useChangePassword;
