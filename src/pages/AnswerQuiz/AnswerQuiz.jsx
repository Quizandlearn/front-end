import React from "react";
import { useLocation } from "react-router-dom";
import "./AnswerQuiz.css";
import AnswerQuizInformation from "../../components/QuizAnswer/QuizAnswerInformation/QuizAnswerInformation";

const AnswerQuiz = () => {
  /* eslint-disable arrow-body-style */
  const location = useLocation();
  const { from } = location.state;

  return (
    <main className="answerQuiz">
      <div className="answerQuiz__block">
        <h1 className="answerQuiz__block__title">Réponse Quiz</h1>
        <AnswerQuizInformation data={from} />
      </div>
    </main>
  );
};

export default AnswerQuiz;
