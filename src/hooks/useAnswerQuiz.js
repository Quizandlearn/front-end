import { useState } from "react";
import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";
import errorDisplayed from "../config/error";
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

const LOGIN_URL_EXPLORE = "/explore";

export const useAnswerQuiz = () => {
  const [result, setResult] = useState({
    loading: false,
    error: "",
    data: {}
  });

  const { user } = useAuth();

  const answerQuiz = async (values, percentageRightAnswers) => {
    try {
      setResult({
        ...result,
        loading: true
      });

      const responseCreateQuiz = await axios.post(
        api.answers,
        JSON.stringify({
          id_quiz: values._id,
          id_user_answered: user.userId,
          title: values.title,
          description: values.description,
          categories: values.category,
          questions: values.questions,
          percentage_right_answers: percentageRightAnswers,
        }),
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setResult({
        ...result,
        loading: false,
        data: {
          title: values.title,
          questions: values.questions,
          score: percentageRightAnswers
        },
      });
    } catch (error) {
      if (!error.response) {
        setResult({
          ...result,
          error: errorDisplayed.server
        });
      }
    }
  };
  return {
    answerQuiz,
    result
  };
};

export default useAnswerQuiz;
