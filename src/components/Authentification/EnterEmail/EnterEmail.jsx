import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { authentificationPropTypes } from "../../../config/propTypes";
import "./EnterEmail.css";
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
    <div className="field">
      <label htmlFor="email" className="sr-only">E-mail</label>
      <input
        id="email"
        type="email"
        placeholder="e-mail"
        className="enterEmail__input input"
        /* Accessibility */
        aria-required="true"
        aria-invalid={emailError}
        aria-describedby={emailError && "error-content-accessibility"}
        /* Formik */
        name="email"
        value={email}
        onChange={handleChange}
        onBlur={handleBlur}
        /* Test */
        data-cy="email"
      />
      {emailError && <FormError errorContent={emailError} />}
    </div>
  );
};

EnterEmail.propTypes = {
  formik: PropTypes.shape(authentificationPropTypes)
};

export default EnterEmail;
