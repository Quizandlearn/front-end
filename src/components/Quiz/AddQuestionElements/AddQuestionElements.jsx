import React, { useState } from "react";
import PropTypes from "prop-types";
import ExplainAnswer from "../ExplainAnswer/ExplainAnswer";
import LearnMoreLink from "../LearnMoreLink/LearnMoreLink";
import { createQuizPropTypes } from "../../../config/propTypes";
/* eslint-disable react/require-default-props */

const answerLimit = 4;

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
      <div className="button-container add-answer-explanation-link">
        {question && question.answers && (question.answers.length < answerLimit) &&
          (
          <button
            className="button add-answer"
            type="button"
            value="Ajouter une réponse"
            onClick={() => push(
              {
                answerContent: "",
                isCorrectAnswer: false
              }
            )}
          >
            + Réponse
          </button>
          )}
        <button
          className="button add-explanation"
          type="button"
          value="Ajouter lien ou explication"
          onClick={() => setShowExplanation(true)}
        >
          + Explication
        </button>
        <button
          className="button add-explanation"
          type="button"
          value="Ajouter lien ou explication"
          onClick={() => setShowLearnMore(true)}
        >
          + Lien d`approfondissement
        </button>
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
