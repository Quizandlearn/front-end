import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./FormError.css";
/* eslint-disable arrow-body-style */

const FormError = ({ errorContent }) => {
  return (
    <div className="formError">
      <FontAwesomeIcon icon={faInfoCircle} className="formError__icon" />
      <p id="error-content-accessibility">{errorContent}</p>
    </div>
  );
};

FormError.propTypes = {
  errorContent: PropTypes.string.isRequired
};

export default FormError;
