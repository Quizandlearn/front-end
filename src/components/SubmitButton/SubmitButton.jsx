import React from "react";
import PropTypes from "prop-types";
import "./SubmitButton.css";
import FormError from "../FormError/FormError";
/* eslint-disable arrow-body-style */
/* eslint-disable react/require-default-props */

const SubmitButton = ({ value, submitError }) => {
  return (
    <div className="submitButton">
      {submitError && <FormError errorContent={submitError} />}
      <button
        type="button"
        className="button submitButton__button"
        data-cy="submit"
      >
        {value}
      </button>
    </div>
  );
};

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired,
  submitError: PropTypes.string
};

export default SubmitButton;
