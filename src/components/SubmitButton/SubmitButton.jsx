import React from "react";
import PropTypes from "prop-types";
/* eslint-disable arrow-body-style */

const Button = ({ value }) => {
  return (
    <div className="button-submit-container">
      <button
        type="submit"
        className="button submit-button"
      >
        {value}
      </button>
    </div>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired
};

export default Button;
