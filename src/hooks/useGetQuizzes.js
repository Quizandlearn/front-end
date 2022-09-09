import { useEffect, useState } from "react";
import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */

const useGetQuizzes = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllQuizzes = async () => {
      setLoading(true);

      try {
        const page = 1;
        const limit = 5;
        const { data: response } = await axios.get(
          `${api.quizzes}/?page=${page}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
            withCredentials: true
          }
        );
        response.quizzes.map(async (quiz) => {
          const { data: userResponse } = await axios.get(`${api.user}/${quiz.id_user_owner}`, {
            headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
            withCredentials: true
          });
          // eslint-disable-next-line no-param-reassign
          quiz.name = userResponse.name;
          console.log("userResponse", userResponse);
          console.log("quiz", quiz);
        });
        console.log("response", response);
        console.log("userData", userData);
        setData(response);
      } catch (error) {
        console.error(error.message);
      }

      setLoading(false);
    };
    getAllQuizzes();
  }, []);

  return { loading, data };
};

export default useGetQuizzes;

/*
  return [loading, data];
*/
