import React from "react";
import PropTypes from "prop-types";
import { createQuizPropTypes } from "../../../config/propTypes";
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
  const { handleChange, handleBlur } = formik;
  return (
    <div className="correct-answer-container">
      <label className="checkbox" htmlFor={fieldName} />
      <input
        type="checkbox"
        id={fieldName}
        name={fieldName}
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      bonne réponse
    </div>
  );
};

DetermineCorrectAnswer.propTypes = {
  index: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
  formik: PropTypes.shape(createQuizPropTypes)
};

export default DetermineCorrectAnswer;
