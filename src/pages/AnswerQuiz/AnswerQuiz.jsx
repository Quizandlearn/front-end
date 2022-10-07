import React from "react";
import { useLocation } from "react-router-dom";
// import useGetQuizzes from "../../hooks/useGetQuizzes";
/* eslint-disable arrow-body-style */

const AnswerQuiz = () => {
//   const { data } = useGetQuizzes();
//   console.log(data);
  const location = useLocation();

  const { from } = location.state;
  console.log("location", from);
  return (
    <div>Quiz</div>
  );
};

export default AnswerQuiz;
