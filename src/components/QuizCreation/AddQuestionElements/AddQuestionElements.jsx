import React, { useState } from "react";
import PropTypes from "prop-types";
import ExplainAnswer from "../ExplainAnswer/ExplainAnswer";
import LearnMoreLink from "../LearnMoreLink/LearnMoreLink";
import { createQuizPropTypes } from "../../../config/propTypes";
import "./AddQuestionElements.css";
/* eslint-disable react/require-default-props */

const answerLimit = 4;

const handleAddAnswer = (push) => {
  push({
    answerContent: "",
    isCorrectAnswer: false
  });
};

const AddQuestionElements = ({
  index,
  formik,
  push
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const { values } = formik;
  const { questions } = values;
  const question = questions[index];

  return (
    <>
      <div className="addQuestionElements">
        {question && question.answers && (question.answers.length < answerLimit) &&
          (
          <button
            className="addQuestionElements__add__answers__button button"
            type="button"
            title="Rajoutez jusqu'à 4 questions"
            aria-label="Rajoutez jusqu'à 4 questions"
            onClick={() => handleAddAnswer(push)}
          >
            + Réponses
          </button>
          )}
        {!showExplanation &&
          (
          <button
            className="addQuestionElements__add__explanation__button button"
            type="button"
            title="Ajouter une explication à la question"
            aria-label="Ajouter une explication à la question"
            onClick={() => setShowExplanation(true)}
            data-cy="addExplanationButton"
          >
            + Explication
          </button>
          )}
        {!showLearnMore &&
          (
          <button
            className="addQuestionElements__add__link__button button"
            type="button"
            title="Ajouter un lien d'approfondissement"
            aria-label="Ajouter un lien d'approfondissement"
            onClick={() => setShowLearnMore(true)}
            data-cy="addLinkButton"
          >
            + Lien
          </button>
          )}
      </div>
      { showExplanation &&
        <ExplainAnswer formik={formik} index={index} /> }
      { showLearnMore &&
        <LearnMoreLink formik={formik} index={index} /> }
    </>
  );
};

AddQuestionElements.propTypes = {
  index: PropTypes.number.isRequired,
  formik: PropTypes.shape(createQuizPropTypes),
  push: PropTypes.func.isRequired
};

export default AddQuestionElements;
