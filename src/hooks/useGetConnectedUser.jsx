import { useEffect, useState } from "react";
import { useRefresh } from "./useRefresh";
import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
const useGetConnectedUser = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refresh, count] = useRefresh();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const id = user.userId;
      if (id) {
        try {
          const { data: response } = await axios.get(`${api.user}/${id}`, {
            headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
            withCredentials: true
          });
          setData(response);
        } catch (error) {
          console.error(error.message);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [count]);
  return [loading, data, refresh];
};

export default useGetConnectedUser;
