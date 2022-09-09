import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
import "./CreateQuestion.css";
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
  if (formik.touched && formik.touched.questions) {
    const { questions } = formik.touched;
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
      <label htmlFor={fieldName} className="createQuestion__label">
        Question
        {" "}
        {index + 1}
      </label>
      <input
        id={fieldName}
        type="text"
        className="createQuestion__input input"
        /* Accessibility */
        aria-required="true"
        aria-invalid={questionError}
        aria-describedby={questionError && "error-content-accessibility"}
        /* Formik */
        name={fieldName}
        value={fieldValue || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        /* Test */
        data-cy="question"
      />
      {questionError && <FormError errorContent={questionError} />}
    </div>
  );
};

CreateQuestion.propTypes = {
  index: PropTypes.number.isRequired,
  formik: PropTypes.shape(createQuizPropTypes)
};

export default CreateQuestion;
