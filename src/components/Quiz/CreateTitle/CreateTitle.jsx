import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
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
      <label htmlFor="title" className="sr-only">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        className="input"
        value={title}
        placeholder="Titre questionnaire"
        required
        onChange={handleChange}
        onBlur={handleBlur}
        data-cy="title"
      />
      {titleError ?
        <FormError errorContent={titleError} />
        : null}
    </>
  );
};

CreateTitle.propTypes = {
  formik: PropTypes.shape(createQuizPropTypes)
};

export default CreateTitle;
