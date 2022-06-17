import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getFieldValue = (formik, questionIndex, answerIndex) => {
  if (formik.values && formik.values.questions) {
    const { questions } = formik.values;
    if (questions[questionIndex] && questions[questionIndex].answers) {
      const { answers } = questions[questionIndex];
      if (answers[answerIndex] && answers[answerIndex].answerContent) {
        const answerValue = answers[answerIndex].answerContent;
        return answerValue;
      }
    }
  }
  return undefined;
};

const getAnswerError = (formik, questionIndex, answerIndex) => {
  let touched = false;
  if (formik.touched && formik.touched.questions) {
    const { questions } = formik.touched;
    if (questions[questionIndex] && questions[questionIndex].answers) {
      const { answers } = questions[questionIndex];
      if (answers[answerIndex] && answers[answerIndex].answerContent) {
        touched = true;
      }
    }
  }

  if (touched && formik.errors && formik.errors.questions) {
    const { questions } = formik.errors;
    if (questions[questionIndex] && questions[questionIndex].answers) {
      const { answers } = questions[questionIndex];
      if (answers[answerIndex] && answers[answerIndex].answerContent) {
        const answerError = answers[answerIndex].answerContent;
        return answerError;
      }
    }
  }
  return undefined;
};

const CreateAnswer = ({
  index,
  idx,
  formik
}) => {
  const fieldName = `questions.${index}.answers.${idx}.answerContent`;
  const fieldValue = getFieldValue(formik, index, idx);
  const answerError = getAnswerError(formik, index, idx);
  const { handleChange, handleBlur } = formik;
  return (
    <div className="field" id="reply-field">
      <label htmlFor={fieldName} className="sr-only" />
      <input
        id={fieldName}
        name={fieldName}
        type="text"
        className="input answer"
        placeholder="réponse"
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {answerError ?
        <FormError errorContent={answerError} />
        : null}
    </div>
  );
};

CreateAnswer.propTypes = {
  index: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
  formik: PropTypes.shape(createQuizPropTypes)
};

export default CreateAnswer;
