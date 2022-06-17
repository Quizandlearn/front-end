import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getLearnMoreValue = (formik, questionIndex) => {
  if (formik.values && formik.values.questions) {
    const { questions } = formik.values;
    if (questions[questionIndex] && questions[questionIndex].learnMore) {
      const learnMoreValue = questions[questionIndex].learnMore;
      return learnMoreValue;
    }
  }
  return undefined;
};

const getLearnMoreError = (formik, questionIndex) => {
  let touched = false;
  if (formik.touched && formik.touched.questions) {
    const { questions } = formik.touched;
    if (questions[questionIndex] && questions[questionIndex].learnMore) {
      touched = true;
    }
  }

  if (touched && formik.errors && formik.errors.questions) {
    const { questions } = formik.errors;
    if (questions[questionIndex] && questions[questionIndex].learnMore) {
      const learnMoreError = questions[questionIndex].learnMore;
      return learnMoreError;
    }
  }
  return undefined;
};

const LearnMoreLink = ({
  formik,
  index
}) => {
  const fieldName = `questions.${index}.learnMore`;
  const fieldValue = getLearnMoreValue(formik, index);
  const learnMoreError = getLearnMoreError(formik, index);
  const { handleChange, handleBlur } = formik;

  return (
    <div className="field">
      <label htmlFor={fieldName} className="sr-only" />
      <input
        id="learnMore"
        name={fieldName}
        type="text"
        className="input learn-more"
        placeholder="Lien d'approfondissement commençant par https://"
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {learnMoreError ?
        <FormError errorContent={learnMoreError} />
        : null}
    </div>
  );
};

LearnMoreLink.propTypes = {
  formik: PropTypes.shape(createQuizPropTypes),
  index: PropTypes.number.isRequired
};

export default LearnMoreLink;
