import { generatePath } from "react-router";

const api = {
  login: "login",
  signup: "signup",
  logout: "logout",
  categories: "categories",
  quizzes: "quizzes",
  user: "user",
};

export const generateRoute = (route, quizId) => generatePath(route, { quizId });

export default api;
