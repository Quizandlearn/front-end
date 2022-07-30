import React from "react";
import PropTypes from "prop-types";
/* eslint-disable arrow-body-style */

const Button = ({ value }) => {
  return (
    <div className="submit-container">
      <button
        type="submit"
        className="button submit"
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
