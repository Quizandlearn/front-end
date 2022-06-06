import { useEffect, useState } from "react";
import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";

const useGetConnectedUser = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const newData = {
        firstName: "Alexandre"
      };

      try {
        const { data: response } = await axios.patch(`${api.user}/${user.userId}`, newData, {
          headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "application/json" },
          withCredentials: true
        });
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

export default useGetConnectedUser;