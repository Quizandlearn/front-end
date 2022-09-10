import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
import "./CreateDescription.css";
/* eslint-disable react/require-default-props */
/* eslint-disable  jsx-a11y/label-has-associated-control */

const getDescriptionError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.description) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.questions) {
    return formik.errors.description;
  }
  return undefined;
};

const CreateDescription = ({ formik }) => {
  const { handleChange, handleBlur, values } = formik;
  const { description } = values;
  const descriptionError = getDescriptionError(formik);
  return (
    <>
      <label htmlFor="description" className="createDescription__label">Description</label>
      <textarea
        id="description"
        className="createDescription__textarea textarea"
        rows="4"
        type="text"
        /* Accessibility */
        aria-required="true"
        aria-invalid={descriptionError}
        aria-describedby={descriptionError && "error-content-accessibility"}
        /* Formik */
        name="description"
        value={description}
        onChange={handleChange}
        onBlur={handleBlur}
        /* Test */
        data-cy="description"
      />
      {descriptionError && <FormError errorContent={descriptionError} />}
    </>
  );
};

CreateDescription.propTypes = {
  formik: PropTypes.shape(createQuizPropTypes)
};

export default CreateDescription;
