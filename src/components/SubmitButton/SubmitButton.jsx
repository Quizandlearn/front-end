import React from "react";
import PropTypes from "prop-types";
import "./SubmitButton.css";
/* eslint-disable arrow-body-style */

const Button = ({ value }) => {
  return (
    <div className="submit">
      <button
        type="submit"
        className="button submit__button"
        data-cy="submit"
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
