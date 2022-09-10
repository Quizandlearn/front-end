import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
/* eslint-disable react/require-default-props */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getQuestionValue = (formik, questionIndex) => {
  if (formik.values && formik.values.questions) {
    const { questions } = formik.values;
    if (questions[questionIndex] && questions[questionIndex].question) {
      const questionValue = questions[questionIndex].question;
      return questionValue;
    }
  }
};

const getQuestionError = (formik, questionIndex) => {
  let touched = false;
  if (formik.touched && formik.values.questions) {
    const { questions } = formik.values;
    if (questions[questionIndex] && questions[questionIndex].question) {
      touched = true;
    }
  }
  if (touched && formik.errors && formik.errors.questions) {
    const { questions } = formik.errors;
    if (questions[questionIndex] && questions[questionIndex].question) {
      const questionError = questions[questionIndex].question;
      return questionError;
    }
  }
};

const CreateQuestion = ({
  index,
  formik
}) => {
  const fieldName = `questions.${index}.question`;
  const fieldValue = getQuestionValue(formik, index);
  const questionError = getQuestionError(formik, index);
  const { handleChange, handleBlur } = formik;
  return (
    <div className="field">
      <label htmlFor={fieldName} className="sr-only" />
      <input
        id={fieldName}
        name={fieldName}
        type="text"
        className="input"
        placeholder="Question"
        value={fieldValue || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        data-cy="question"
      />
      {questionError ?
        <FormError errorContent={questionError} />
        : null}
    </div>
  );
};

CreateQuestion.propTypes = {
  index: PropTypes.number.isRequired,
  formik: PropTypes.shape(createQuizPropTypes)
};

export default CreateQuestion;
