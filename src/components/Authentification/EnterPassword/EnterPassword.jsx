import React, { useState } from "react";
import PropTypes from "prop-types";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormError from "../../FormError/FormError";
import { authentificationPropTypes } from "../../../config/propTypes";
import "./EnterPassword.css";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getPasswordError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.password) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.password) {
    return formik.errors.password;
  }
  return undefined;
};

const EnterPassword = ({ formik, deleteSubmitError }) => {
  const passwordError = getPasswordError(formik);
  const { handleChange, handleBlur, values } = formik;
  const { password } = values;
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="field password">
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        type={passwordShown ? "text" : "password"}
        className="enterPassword__input input"
        placeholder="Mot de passe"
        autoComplete="on"
        /* Accessibility */
        aria-required="true"
        aria-invalid={passwordError}
        aria-describedby={passwordError && "error-content-accessibility"}
        /* Formik */
        name="password"
        value={password}
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur(e);
          deleteSubmitError();
        }}
        /* Test */
        data-cy="password"
      />
      <button
        type="button"
        onClick={togglePasswordVisiblity}
        className="enterPassword__toggle__visibility"
      >
        <FontAwesomeIcon
          icon={faEye}
          className="enterPassword__toggle__visibility__icon"
        />
      </button>
      {passwordError && <FormError errorContent={passwordError} />}
    </div>
  );
};

EnterPassword.propTypes = {
  formik: PropTypes.shape(authentificationPropTypes),
  deleteSubmitError: PropTypes.func.isRequired,
};

export default EnterPassword;
