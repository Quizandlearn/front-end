import React from "react";
import PropTypes from "prop-types";
import { createQuizPropTypes } from "../../../config/propTypes";
import "./DetermineCorrectAnswer.css";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getFieldValue = (formik, questionIndex, answerIndex) => {
  if (formik.values && formik.values.questions) {
    const { questions } = formik.values;
    if (questions[questionIndex] && questions[questionIndex].answers) {
      const { answers } = questions[questionIndex];
      if (answers[answerIndex] && answers[answerIndex].isCorrectAnswer) {
        const { isCorrectAnswer } = answers[answerIndex];
        return isCorrectAnswer;
      }
    }
  }
  return undefined;
};

const DetermineCorrectAnswer = ({
  index,
  idx,
  formik
}) => {
  const fieldName = `questions.${index}.answers.${idx}.isCorrectAnswer`;
  const fieldValue = getFieldValue(formik, index, idx);
  const { handleChange } = formik;
  return (
    <div className="determineCorrectAnswer">
      <label htmlFor={fieldName} className="determineCorrectAnswer__label">
        Bonne réponse
      </label>
      <input
        type="checkbox"
        id={fieldName}
        className="determineCorrectAnswer__input"
        /* Formik */
        value={fieldValue}
        name={fieldName}
        onChange={handleChange}
      />
    </div>
  );
};

DetermineCorrectAnswer.propTypes = {
  index: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
  formik: PropTypes.shape(createQuizPropTypes)
};

export default DetermineCorrectAnswer;
