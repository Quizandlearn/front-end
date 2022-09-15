import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { authentificationPropTypes } from "../../../config/propTypes";
import "./EnterName.css";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getNameError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.name) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.name) {
    return formik.errors.name;
  }
  return undefined;
};

const EnterName = ({ formik, deleteSubmitError }) => {
  const nameError = getNameError(formik);
  const { handleChange, handleBlur, values } = formik;
  const { name } = values;
  return (
    <div className="field">
      <label htmlFor="name" className="sr-only">Prénom*</label>
      <input
        id="name"
        type="text"
        placeholder="Prénom"
        className="enterName__input input"
        /* Accessibility */
        aria-required="true"
        aria-invalid={nameError}
        aria-describedby={nameError && "error-content-accessibility"}
        /* Formik */
        name="name"
        value={name}
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur(e);
          deleteSubmitError();
        }}
        /* Test */
        data-cy="name"
      />
      {nameError && <FormError errorContent={nameError} />}
    </div>
  );
};

EnterName.propTypes = {
  formik: PropTypes.shape(authentificationPropTypes),
  deleteSubmitError: PropTypes.func.isRequired
};

export default EnterName;
