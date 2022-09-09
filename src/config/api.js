import { generatePath } from "react-router";

const api = {
  login: "login",
  signup: "signup",
  logout: "logout",
  categories: "categories",
  quizzes: "quizzes",
  questions: "quizzes/:quizId/questions",
  choices: "quizzes/:quizId/questions/:questionId/choices",
  user: "user",
};

export const generateRoute = (route, quizId, questionId) => generatePath(route, { quizId, questionId });

export default api;
