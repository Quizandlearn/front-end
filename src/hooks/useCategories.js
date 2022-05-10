import axios from '../config/axios';
import { api } from '../config/api';
import { useEffect, useState } from 'react';
import { useAuth } from "../hooks/useAuth";

export const useCategoriesQuiz = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { user}  = useAuth();

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get(api.categories, {
              headers: {"Authorization" : `Bearer ${user.token}`, 'Content-Type': 'application/json'},
              withCredentials: true
          }
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  
  return [loading, data];
};