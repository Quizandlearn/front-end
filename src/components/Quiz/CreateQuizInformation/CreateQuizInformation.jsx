import React from "react";
import PropTypes from "prop-types";
import CreateTitle from "../CreateTitle/CreateTitle";
import CreateDescription from "../CreateDescription/CreateDescription";
import SelectCategory from "../SelectCategory/SelectCategory";
import { createQuizPropTypes } from "../../../config/propTypes";
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */

const CreateQuizInformation = ({ formik }) => {
  return (
    <div className="section-container">
      <CreateTitle formik={formik} />
      <CreateDescription formik={formik} />
      <SelectCategory formik={formik} />
    </div>
  );
};

CreateQuizInformation.propTypes = {
  formik: PropTypes.shape(createQuizPropTypes)
};

export default CreateQuizInformation;
