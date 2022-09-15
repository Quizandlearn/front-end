import React from "react";
import PropTypes from "prop-types";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
import "./CreateAndRemoveAnswers.css";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getFieldValue = (formik, questionIndex, answerIndex) => {
  if (formik.values && formik.values.questions) {
    const { questions } = formik.values;
    if (questions[questionIndex] && questions[questionIndex].answers) {
      const { answers } = questions[questionIndex];
      if (answers[answerIndex] && answers[answerIndex].answerContent) {
        const answerValue = answers[answerIndex].answerContent;
        return answerValue;
      }
    }
  }
  return undefined;
};

const getAnswerError = (formik, questionIndex, answerIndex) => {
  let touched = false;
  if (formik.touched && formik.touched.questions) {
    const { questions } = formik.touched;
    if (questions[questionIndex] && questions[questionIndex].answers) {
      const { answers } = questions[questionIndex];
      if (answers[answerIndex] && answers[answerIndex].answerContent) {
        touched = true;
      }
    }
  }

  if (touched && formik.errors && formik.errors.questions) {
    const { questions } = formik.errors;
    if (questions[questionIndex] && questions[questionIndex].answers) {
      const { answers } = questions[questionIndex];
      if (answers[answerIndex] && answers[answerIndex].answerContent) {
        const answerError = answers[answerIndex].answerContent;
        return answerError;
      }
    }
  }
  return undefined;
};

const answerMinimum = 2;

const CreateAndRemoveAnswers = ({
  index,
  idx,
  formik,
  question,
  remove
}) => {
  const fieldName = `questions.${index}.answers.${idx}.answerContent`;
  const fieldValue = getFieldValue(formik, index, idx);
  const answerError = getAnswerError(formik, index, idx);
  const { handleChange, handleBlur } = formik;
  return (
    <div className="createAndRemoveAnswer field" id="reply-field">
      <label htmlFor={fieldName} className="createAndRemoveAnswer__label">
        Reponse
        {" "}
        { idx + 1 }
      </label>
      <div className="createAndRemoveAnswer__enter__or__remove__answers">
        <input
          id={fieldName}
          type="text"
          className="createAndRemoveAnswer__input input"
          /* Accessibility */
          aria-required="true"
          aria-invalid={answerError}
          aria-describedby={answerError && "error-content-accessibility"}
          /* Formik */
          name={fieldName}
          value={fieldValue || ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {question && question.answers.length > answerMinimum && (
          <button
            className="createAndRemoveAnswer__remove__answer__button button"
            type="button"
            /* Accessibilité */
            aria-label={`supprimer la reponse ${idx + 1}`}
            onClick={() => remove(idx)}
          >
            <FontAwesomeIcon icon={faX} className="createAndRemoveAnswer__remove__answer__button__icon" />
          </button>
        )}
      </div>
      {answerError && <FormError errorContent={answerError} />}
    </div>
  );
};

CreateAndRemoveAnswers.propTypes = {
  index: PropTypes.number.isRequired,
  idx: PropTypes.number.isRequired,
  formik: PropTypes.shape(createQuizPropTypes),
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      answerContent: PropTypes.string.isRequired
    }))
  }),
  remove: PropTypes.func.isRequired
};

export default CreateAndRemoveAnswers;
