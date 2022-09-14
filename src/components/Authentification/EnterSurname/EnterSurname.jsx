import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { authentificationPropTypes } from "../../../config/propTypes";
import "./EnterSurname.css";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getSurnameError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.surname) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.surname) {
    return formik.errors.surname;
  }
  return undefined;
};

const EnterSurname = ({ formik, deleteSubmitError }) => {
  const surnameError = getSurnameError(formik);
  const { handleChange, handleBlur, values } = formik;
  const { surname } = values;
  return (
    <div className="field">
      <label htmlFor="nom" className="sr-only">Nom</label>
      <input
        id="nom"
        type="text"
        className="enterSurname__input input"
        placeholder="Nom"
        /* Accessibility */
        aria-required="true"
        aria-invalid={surnameError}
        aria-describedby={surnameError && "error-content-accessibility"}
        /* Formik */
        name="surname"
        value={surname}
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur(e);
          deleteSubmitError();
        }}
        /* Test */
        data-cy="surname"
      />
      {surnameError && <FormError errorContent={surnameError} />}
    </div>
  );
};

EnterSurname.propTypes = {
  formik: PropTypes.shape(authentificationPropTypes),
  deleteSubmitError: PropTypes.func.isRequired
};

export default EnterSurname;
