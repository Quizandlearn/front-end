import { useEffect, useState } from "react";
import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */

const useCategoriesQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(api.categories, {
          headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
          withCredentials: true
        });
        console.log(response);
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return [loading, data];
};

export default useCategoriesQuiz;
