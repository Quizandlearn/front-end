import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import api from "../config/api";
import errorDisplayed from "../config/error";
import useAuth from "./useAuth";
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */

const LOGIN_URL_EXPLORE = "/explore";

// to do: clean urls

export const useCreateQuiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const createQuiz = async (values, onError) => {
    try {
      const responseCreateQuiz = await axios.post(
        api.quizzes,
        JSON.stringify({ id_user_owner: user.userId,
          title: values.title,
          description: values.description,
          categories: values.category }),
        {
          headers: { Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      console.log("responseCreateQuizSkeleton", responseCreateQuiz);

      const convertedQuestions = [];
      values.questions.map((question, position) => convertedQuestions.push({
        id_quiz: responseCreateQuiz.data.idQuiz,
        title: question.question,
        choices: [],
        explanation: question.explanation,
        link_to_learn_more: question.learnMore,
        position
      }));

      console.log("convertedQuestions", convertedQuestions);
      const responseCreateQuestions = await axios.post(
        "quizzes/" + responseCreateQuiz.data.idQuiz + "/questions",
        JSON.stringify({ questions: convertedQuestions }),
        {
          headers: { Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      console.log("responseCreateQuestions", responseCreateQuestions);
      console.log("responseCreateQuestions.data.idQuestions", responseCreateQuestions.data.idQuestions);

      responseCreateQuestions.data.idQuestions.map(async (idQuestion, i) => {
        const choices = [];
        values.questions[i].answers.map((answer, position) => choices.push({
          id_question: idQuestion,
          content: answer.answerContent,
          isCorrect: answer.isCorrectAnswer,
          position
        }));

        console.log("choices", choices);
        const responseCreateChoice = await axios.post(
          "quizzes/" + responseCreateQuiz.data.idQuiz + "/questions/" + idQuestion + "/choices",
          JSON.stringify({ choices }),
          {
            headers: { Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json" },
            withCredentials: true
          }
        );
        console.log("responseCreateChoice", responseCreateChoice);
      });
      navigate(LOGIN_URL_EXPLORE);
    } catch (error) {
      if (typeof onError === "function") {
        if (!error.response) {
          onError(errorDisplayed.server);

          /* Changer cette erreur */
        } else if (error.response.status === 400) {
          onError(errorDisplayed.existingAccount);
        }
      }
    }
  };

  return {
    createQuiz
  };
};

export default useCreateQuiz;
