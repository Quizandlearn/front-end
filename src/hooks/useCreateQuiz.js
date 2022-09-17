import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import api from "../config/api";
import useAuth from "./useAuth";
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */

const LOGIN_URL_EXPLORE = "/explore";

export const useCreateQuiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const createQuiz = async (values, showServerError) => {
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
      if (!error.response) {
        showServerError();
      }
    }
  };
  return {
    createQuiz
  };
};

export default useCreateQuiz;
