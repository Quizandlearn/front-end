import React from "react";
import { useLocation } from "react-router-dom";
import "./AnswerQuiz.css";
import profileQuiz from "../../assets/profileQuiz.png";
// import useGetQuizzes from "../../hooks/useGetQuizzes";
/* eslint-disable arrow-body-style */

const AnswerQuiz = () => {
//   const { data } = useGetQuizzes();
//   console.log(data);
  const location = useLocation();

  const { from } = location.state;
  console.log("location", from);
  return (
    <main className="answerQuiz">
      <div className="answerQuiz__block">
        <h1 className="answerQuiz__block__title">Answer Quiz title</h1>
        <div className="answerQuiz__block__information">
          <h2 className="answerQuiz__block__information__title">Questionnaire React</h2>
          <div className="answerQuiz__block__information__title__userName">
            <p>Quiz créé par Marion Lenoir</p>
            <figure className="image is-64x64">
              <img
                src={profileQuiz}
                alt="Profile"
              />
            </figure>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnswerQuiz;
