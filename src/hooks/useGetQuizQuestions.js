import { useEffect, useState } from "react";
import axios from "../config/axios";
import api, { generateRoute } from "../config/api";
import useAuth from "./useAuth";

const useGetQuizQuestions = (quizId) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getQuizQuestions = async () => {
      setLoading(true);

      try {
        const { data: response } = await axios.get(
          generateRoute(api.quizzes, quizId),
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
    getQuizQuestions();
  }, []);

  return { loading, data };
};

export default useGetQuizQuestions;
