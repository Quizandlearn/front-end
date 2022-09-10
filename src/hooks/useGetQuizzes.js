import { useEffect, useState } from "react";
import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";
/* eslint-disable no-unused-vars */

const useGetQuizzes = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllQuizzes = async () => {
      setLoading(true);

      try {
        const { data: response } = await axios.get(
          `${api.quizzes}`,
          {
            headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
            withCredentials: true
          }
        );
        const final = await Promise.all(response.quizzes.map(async (quiz) => {
          const userResponse = await axios.get(`${api.user}/${quiz.id_user_owner}`, {
            headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
            withCredentials: true
          });
          return { ...quiz, user: userResponse.data };
        }));
        setData(final);
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
