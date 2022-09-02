import React, { useState } from "react";
import PropTypes from "prop-types";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormError from "../../FormError/FormError";
import { authentificationPropTypes } from "../../../config/propTypes";
import "./EnterConfirmedPassword.css";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getConfirmedPasswordError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.confirmedPassword) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.confirmedPassword) {
    return formik.errors.confirmedPassword;
  }
  return undefined;
};

const EnterConfirmedPassword = ({ formik }) => {
  const confirmedPasswordError = getConfirmedPasswordError(formik);
  const { handleChange, handleBlur, values } = formik;
  const { confirmedPassword } = values;
  const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);

  const toggleConfirmedPasswordVisiblity = () => {
    setConfirmedPasswordShown(!confirmedPasswordShown);
  };
  return (
    <div className="field password">
      <label htmlFor="password-confirmation" className="sr-only">Confirmation du mot de passe</label>
      <input
        id="password-confirmation"
        type={confirmedPasswordShown ? "text" : "password"}
        className="input"
        placeholder="confirmation mot de passe"
        /* Accessibility */
        aria-required="true"
        aria-invalid={confirmedPasswordError}
        aria-describedby={confirmedPasswordError && "error-content-accessibility"}
        /* Formik */
        name="confirmedPassword"
        value={confirmedPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        /* Test */
        data-cy="passwordConfirmation"
      />
      <button type="button" onClick={toggleConfirmedPasswordVisiblity} className="confirm__password__toggle__visibility">
        <FontAwesomeIcon icon={faEye} className="confirm__password__toggle__visibility__icon" />
      </button>
      {confirmedPasswordError && <FormError errorContent={confirmedPasswordError} />}
    </div>
  );
};

EnterConfirmedPassword.propTypes = {
  formik: PropTypes.shape(authentificationPropTypes)
};

export default EnterConfirmedPassword;
