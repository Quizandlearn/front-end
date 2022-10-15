import React from "react";
import "./QuizAnswerInformation.css";
import profileQuiz from "../../../assets/profileQuiz.png";
/* eslint-disable arrow-body-style */

const convertFirstLetterToUpperCase = (word) => {
  return word.replace(word[0], word[0].toUpperCase());
};

const AnswerQuizInformation = ({ data }) => {
  const { title, user, description, categories } = data;
  const { name, surname } = user;
  const nameWithFirstLetterToUpperCase = convertFirstLetterToUpperCase(name);
  const surnameWithFirstLetterToUpperCase = convertFirstLetterToUpperCase(surname);

  return (
    <section className="answerQuizInformation">
      <div className="answerQuizInformation__header">
        <h2 className="answerQuizInformation__title">{title}</h2>
        <div className="answerQuizInformation__user">
          <p className="answerQuizInformation__userName">
            Quiz créé par
            {" "}
            {nameWithFirstLetterToUpperCase}
            {" "}
            {surnameWithFirstLetterToUpperCase}
          </p>
          <figure className="answerQuizInformation__userFigure image is-64x64">
            <img
              src={profileQuiz}
              alt="Profile"
            />
          </figure>
        </div>
      </div>
      <p className="answerQuizInformation__description">{description}</p>
      <p className="answerQuizInformation__instructions">
        A lire avant de commencer le quiz : chaque question peut avoir une ou plusieurs réponses correctes.
      </p>
      <div className="answerQuizInformation__category">
        <p className="answerQuizInformation__category___text">{categories}</p>
      </div>
    </section>
  );
};

export default AnswerQuizInformation;
