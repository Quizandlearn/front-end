import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { authentificationPropTypes } from "../../../config/propTypes";
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

const EnterName = ({ formik }) => {
  const nameError = getNameError(formik);
  const { handleChange, handleBlur, values } = formik;
  const { name } = values;
  return (
    <div className="field sign-up-field">
      <label htmlFor="name" className="sr-only">Prénom*</label>
      <input
        id="name"
        name="name"
        type="text"
        autoComplete="on"
        onChange={handleChange}
        onBlur={handleBlur}
        value={name}
        className="input"
        placeholder="Prénom"
        data-cy="name"
      />
      {nameError ?
        <FormError errorContent={nameError} />
        : null}
    </div>
  );
};

EnterName.propTypes = {
  formik: PropTypes.shape(authentificationPropTypes)
};

export default EnterName;
