import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
import "./SelectCategory.css";
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable  jsx-a11y/label-has-associated-control */

const categories = ["Tech", "Féminisme", "Écologie", "Économie"];

const getCategoryError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.category) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.category) {
    return formik.errors.category;
  }
  return undefined;
};

const SelectCategory = ({ formik }) => {
  const { handleChange, handleBlur, values } = formik;
  const { category } = values;
  const categoryError = getCategoryError(formik);
  return (
    <div className="selectCategories select is-warning">
      <label htmlFor="select-categories" className="sr-only">Thématique</label>
      <select
        id="select-categories"
        /* Accessibility */
        aria-required="true"
        aria-invalid={categoryError}
        aria-describedby={categoryError && "error-content-accessibility"}
        /* Formik */
        name="category"
        value={category}
        onChange={handleChange}
        onBlur={handleBlur}
        /* Test */
        data-cy="categories"
      >
        <option value="" disabled>
          Thématique
        </option>
        {categories.map((category, index) => {
          return (
            <option key={index} value={category.title}>
              {category}
            </option>
          );
        })}
      </select>
      {categoryError && <FormError errorContent={categoryError} />}
    </div>
  );
};

SelectCategory.propTypes = {
  formik: PropTypes.shape(createQuizPropTypes)
};

export default SelectCategory;
