import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import api from "../config/api";
import errorDisplayed from "../config/error";
import useAuth from "./useAuth";
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */

const LOGIN_URL_EXPLORE = "/explore";

export const useCreateQuiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const createQuiz = async (values, onError) => {
    try {
      // data conversion to match what expects backend
      const convertedQuestions = [];
      values.questions.map((question) => {
        const convertedChoices = [];
        question.answers.map((choice) => (
          convertedChoices.push({
            content: choice.answerContent,
            isCorrect: choice.isCorrectAnswer,
          })
        ));
        convertedQuestions.push({
          title: question.question,
          choices: convertedChoices,
          explanation: question.explanation,
          link_to_learn_more: question.learnMore,
        });
        return convertedQuestions;
      });

      // sending request
      const responseCreateQuiz = await axios.post(
        api.quizzes,
        JSON.stringify({
          id_user_owner: user.userId,
          title: values.title,
          description: values.description,
          categories: values.category,
          questions: convertedQuestions,
        }),
        {
          headers: { Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      navigate(LOGIN_URL_EXPLORE);
    } catch (error) {
      if (typeof onError === "function") {
        if (!error.response) {
          onError(errorDisplayed.server);
        } else {
          onError(error.response);
        }
      }
    }
  };
  return {
    createQuiz
  };
};

export default useCreateQuiz;
