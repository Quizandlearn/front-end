import React from "react";
import PropTypes from "prop-types";
import "./SubmitButton.css";
/* eslint-disable arrow-body-style */

const SubmitButton = ({ value }) => {
  return (
    <div className="submitButton">
      <button
        type="submit"
        className="button submitButton__button"
        data-cy="submit"
      >
        {value}
      </button>
    </div>
  );
};

SubmitButton.propTypes = {
  value: PropTypes.string.isRequired
};

export default SubmitButton;
