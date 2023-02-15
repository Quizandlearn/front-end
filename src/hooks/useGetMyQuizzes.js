import { useEffect, useState } from "react";
import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";

const useGetMyQuizzes = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllQuizzes = async () => {
      setLoading(true);

      try {
        const { data: response } = await axios.get(
          `${api.user}/${user.userId}/${api.quizzes}`,
          {
            headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
            withCredentials: true
          }
        );
        response.forEach((quiz) => {
          const item = quiz;
          item.user = user;
          return item;
        });
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

export default useGetMyQuizzes;
