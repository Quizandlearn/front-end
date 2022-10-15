import React from "react";
import { useLocation } from "react-router-dom";
import "./AnswerQuiz.css";
import profileQuiz from "../../assets/profileQuiz.png";
/* eslint-disable arrow-body-style */

const convertFirstLetterToUpperCase = (word) => {
  return word.replace(word[0], word[0].toUpperCase());
};

const AnswerQuiz = () => {
  const location = useLocation();
  const { from } = location.state;
  console.log("location", from);
  const { title, user, description, categories } = from;
  const { name, surname } = user;
  const nameWithFirstLetterToUpperCase = convertFirstLetterToUpperCase(name);
  const surnameWithFirstLetterToUpperCase = convertFirstLetterToUpperCase(surname);

  return (
    <main className="answerQuiz">
      <div className="answerQuiz__block">
        <h1 className="answerQuiz__block__title">Réponse Quiz</h1>
        <div className="answerQuiz__block__information">
          <div className="answerQuiz__block__information__header">
            <h2 className="answerQuiz__block__information__title">{title}</h2>
            <div className="answerQuiz__block__information__user">
              <p className="answerQuiz__block__information__userName">
                Quiz créé par
                {" "}
                {nameWithFirstLetterToUpperCase}
                {" "}
                {surnameWithFirstLetterToUpperCase}
              </p>
              <figure className="answerQuiz__block__information__userFigure image is-64x64">
                <img
                  src={profileQuiz}
                  alt="Profile"
                />
              </figure>
            </div>
          </div>
          <p className="answerQuiz__block__information__description">{description}</p>
          <p className="answerQuiz__block__information__instructions">
            A lire avant de commencer le quiz : chaque question peut avoir une ou plusieurs réponses correctes.
          </p>
          <div className="answerQuiz__block__information__category">
            <p className="answerQuiz__block__information__category___text">{categories}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnswerQuiz;
