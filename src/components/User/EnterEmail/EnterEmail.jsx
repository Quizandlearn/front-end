import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { authentificationPropTypes } from "../../../config/propTypes";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getEmailError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.email) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.email) {
    return formik.errors.email;
  }
  return undefined;
};

const EnterEmail = ({ formik }) => {
  const emailError = getEmailError(formik);
  const { handleChange, handleBlur, values } = formik;
  const { email } = values;
  return (
    <div className="field login__form">
      <label htmlFor="email" className="sr-only">E-mail</label>
      <input
        id="email"
        name="email"
        type="email"
        className="input"
        autoComplete="on"
        onChange={handleChange}
        onBlur={handleBlur}
        value={email}
        placeholder="E-mail"
      />
      {emailError ?
        <FormError errorContent={emailError} />
        : null}
    </div>
  );
};

EnterEmail.propTypes = {
  formik: PropTypes.shape(authentificationPropTypes)
};

export default EnterEmail;
