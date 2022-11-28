import { useState } from "react";

import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";
/* eslint-disable no-unused-vars */

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState("");
  const { user } = useAuth();
  const id = user.userId;

  const changePassword = async (
    currentPassword,
    updatedConfirmedPassword,
    showServerError
  ) => {
    setIsLoading(true);
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
      console.log("RESPONSE", response.status);
    } catch (error) {
      if (!error.response) {
        showServerError();
      }
    }
  };

  return {
    changePassword,
    isLoading,
  };
};

export default useChangePassword;
