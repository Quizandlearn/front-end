import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { resultPropTypes } from "../../../config/propTypes";
import "./QuizAnswerScore.css";
/* eslint-disable arrow-body-style */

const EXPLORE_URL_FRONTEND = "/quizzes";

function removeHttp(url) {
  return url.replace(/^https?:\/\//, "");
}

const QuizAnswerScore = ({ result }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <h1 className="quizAnswerScore__quizTitle">
        Réponses au quiz:
        {" "}
        {result.data.title}
      </h1>
      <p className="quizAnswerScore__quizScore">
        Score:
        {" "}
        {result.data.score}
        %
      </p>
      {result.data.questions.map((question, index) => {
        return (
          <section className="quizAnswerScore_questionBloc" key={question._id}>
            <p className="quizAnswerScore__questionNumber">{index + 1}</p>
            <div className="quizAnswerScore__questionSection">
              <h2 className="quizAnswerScore__questionSection__title">
                {question.title}
              </h2>
              {question.choices.map((choice, idx) => {
                return (
                  <div
                    key={choice._id}
                    className="quizAnswerScore__questionSection__inputContainer"
                  >
                    {choice.isCorrect && (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="quizAnswerScore__questionSection__isCorrect"
                      />
                    )}
                    {choice.isChecked && !choice.isCorrect && (
                      <FontAwesomeIcon
                        icon={faX}
                        className="quizAnswerScore__questionSection__isNotCorrect"
                      />
                    )}
                    {!choice.isChecked && !choice.isCorrect && (
                      <div className="quizAnswerScore__questionSection__empty" />
                    )}
                    <input
                      type="checkbox"
                      id={`questions.${index}.choices.${idx}.isChecked`}
                      name={`questions.${index}.choices.${idx}.isChecked`}
                      className="checkbox"
                      checked={choice.isChecked}
                      readOnly
                    />
                    <label
                      htmlFor={`questions.${index}.choices.${idx}.isChecked`}
                      className="quizAnswerScore__questionSection__label"
                    >
                      {choice.content}
                    </label>
                  </div>
                );
              })}
              {question.explanation && (
                <p className="quizAnswerScore__questionSection__explanation">
                  {" "}
                  {question.explanation}
                </p>
              )}
              {question.link_to_learn_more && (
                <a
                  href={question.link_to_learn_more}
                  target="_blank"
                  rel="noreferrer"
                  className="quizAnswerScore__questionSection__link"
                >
                  {" "}
                  <span className="quizAnswerScore__questionSection__textForLink">
                    En savoir plus :
                  </span>
                  {" "}
                  {removeHttp(question.link_to_learn_more)}
                </a>
              )}
            </div>
          </section>
        );
      })}
      <div className="quizAnswerScore__buttonContainer">
        <Link to={EXPLORE_URL_FRONTEND}>
          <button type="button" className="button quizAnswerScore__button">
            Retour aux quizzes...
          </button>
        </Link>
      </div>
    </>
  );
};

QuizAnswerScore.propTypes = {
  /* eslint-disable react/require-default-props */
  result: PropTypes.shape(resultPropTypes),
};

export default QuizAnswerScore;
