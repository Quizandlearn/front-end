import React from "react";
import PropTypes from "prop-types";
import FormError from "../../FormError/FormError";
import useCategoriesQuiz from "../../../hooks/useCategories";
import { createQuizPropTypes } from "../../../config/propTypes";
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */

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
  const [loading, data] = useCategoriesQuiz();
  const { handleChange, handleBlur, values } = formik;
  const { category } = values;
  const categoryError = getCategoryError(formik);
  return (
    <>
      {loading && <div>Loading</div>}

      {!loading && (
        <div className="select is-warning" id="select-categories-container">
          <select
            id="select-categories"
            name="category"
            value={category}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="" disabled>
              Thématique
            </option>
            {data.categories.map((category, index) => {
              return (
                <option key={index} value={category.title}>
                  {category.title}
                </option>
              );
            })}
          </select>
          {categoryError ?
            <FormError errorContent={categoryError} />
            : null}
        </div>
      )}
    </>
  );
};

SelectCategory.propTypes = {
  formik: PropTypes.shape(createQuizPropTypes)
};

export default SelectCategory;
