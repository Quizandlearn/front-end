import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
/* eslint-disable arrow-body-style */

const FormError = ({ errorContent }) => {
  return (
    <div className="error-message-form">
      <FontAwesomeIcon icon={faInfoCircle} className="formError-icon" />
      <p className="formError-message">{errorContent}</p>
    </div>
  );
};

FormError.propTypes = {
  errorContent: PropTypes.string.isRequired
};

export default FormError;
