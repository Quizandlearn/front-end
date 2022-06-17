import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */

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
      <textarea
        name="description"
        className="textarea"
        placeholder="Description"
        rows="4"
        type="text"
        value={description}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {descriptionError ?
        <FormError errorContent={descriptionError} />
        : null}
    </>
  );
};

CreateDescription.propTypes = {
  formik: PropTypes.shape(createQuizPropTypes)
};

export default CreateDescription;
