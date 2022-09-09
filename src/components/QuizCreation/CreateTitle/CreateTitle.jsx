import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
import "./CreateTitle.css";
/* eslint-disable  jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */

const getTitleError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.title) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.title) {
    return formik.errors.title;
  }
  return undefined;
};

const CreateTitle = ({ formik }) => {
  const titleError = getTitleError(formik);
  const { handleChange, handleBlur, values } = formik;
  const { title } = values;
  return (
    <>
      <label htmlFor="title" className="createTitle__label">Titre Questionnaire</label>
      <input
        id="title"
        type="text"
        className="createTitle__input input"
        /* Accessibility */
        aria-required="true"
        aria-invalid={titleError}
        aria-describedby={titleError && "error-content-accessibility"}
        /* Formik */
        name="title"
        value={title}
        onChange={handleChange}
        onBlur={handleBlur}
        /* Test */
        data-cy="title"
      />
      {titleError && <FormError errorContent={titleError} />}
    </>
  );
};

CreateTitle.propTypes = {
  formik: PropTypes.shape(createQuizPropTypes)
};

export default CreateTitle;
