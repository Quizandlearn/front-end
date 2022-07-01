import React, { useState } from "react";
import PropTypes from "prop-types";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormError from "../../FormError/FormError";
import { authentificationPropTypes } from "../../../config/propTypes";
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

const EnterPassword = ({ formik }) => {
  const passwordError = getPasswordError(formik);
  const { handleChange, handleBlur, values } = formik;
  const { password } = values;
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="field login-form password-container">
      <label htmlFor="password" className="sr-only">Password</label>
      <input
        id="password"
        name="password"
        autoComplete="on"
        type={passwordShown ? "text" : "password"}
        className="input"
        onChange={handleChange}
        onBlur={handleBlur}
        value={password}
        placeholder="password"
      />
      <button type="button" onClick={togglePasswordVisiblity} className="password-eye-sign-up">
        <FontAwesomeIcon icon={faEye} className="eye-sign-up" />
      </button>
      {passwordError ?
        <FormError errorContent={passwordError} />
        : null}
    </div>
  );
};

EnterPassword.propTypes = {
  formik: PropTypes.shape(authentificationPropTypes)
};

export default EnterPassword;
