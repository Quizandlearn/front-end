import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
import "./ExplainAnswer.css";
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getFieldValue = (formik, questionIndex) => {
  if (formik.values && formik.values.questions) {
    const { questions } = formik.values;
    if (questions[questionIndex] && questions[questionIndex].explanation) {
      const explanationValue = questions[questionIndex].explanation;
      return explanationValue;
    }
  }
  return undefined;
};

const getExplanationError = (formik, questionIndex) => {
  let touched = false;
  if (formik.touched && formik.touched.questions) {
    const { questions } = formik.touched;
    if (questions[questionIndex] && questions[questionIndex].explanation) {
      touched = true;
    }
  }

  if (touched && formik.errors && formik.errors.questions) {
    const { questions } = formik.errors;
    if (questions[questionIndex] && questions[questionIndex].explanation) {
      const explanationError = questions[questionIndex].explanation;
      return explanationError;
    }
  }
  return undefined;
};

const ExplainAnswer = ({
  formik,
  index
}) => {
  const fieldName = `questions.${index}.explanation`;
  const fieldValue = getFieldValue(formik, index);
  const explanationError = getExplanationError(formik, index);
  const { handleChange, handleBlur } = formik;
  return (
    <div className="explainAnswer">
      <label htmlFor="explainAnswer" className="explainAnswer__label">Détail de ou des réponse correctes</label>
      <textarea
        id="explainAnswer"
        className="explainAnswer__textarea textarea"
        rows="4"
        type="text"
        /* Accessibility */
        aria-invalid={explanationError}
        aria-describedby={explanationError && "error-content-accessibility"}
        /* Formik */
        name={fieldName}
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {explanationError && <FormError errorContent={explanationError} />}
    </div>
  );
};

ExplainAnswer.propTypes = {
  formik: PropTypes.shape(createQuizPropTypes),
  index: PropTypes.number.isRequired
};

export default ExplainAnswer;
