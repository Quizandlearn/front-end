import { generatePath } from "react-router";

const api = {
  login: "login",
  signup: "signup",
  logout: "logout",
  categories: "categories",
  quizzes: "quizzes",
  answers: "answers",
  user: "user",
};

export const generateRoute = (route, quizId) => generatePath(route, { quizId });

export default api;
