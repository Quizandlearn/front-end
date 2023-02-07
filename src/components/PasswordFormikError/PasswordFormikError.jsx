import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./PasswordFormikError.css";
/* eslint-disable arrow-body-style */

const PasswordFormikError = ({ errorContent }) => {
  return (
    <div className="passwordForm__error">
      <FontAwesomeIcon icon={faInfoCircle} className="passwordForm__error__icon" />
      <p id="passwordForm__error__title">{errorContent}</p>
    </div>
  );
};

PasswordFormikError.propTypes = {
  errorContent: PropTypes.string.isRequired
};

export default PasswordFormikError;
