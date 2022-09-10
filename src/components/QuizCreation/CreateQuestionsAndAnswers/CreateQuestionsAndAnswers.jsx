import React from "react";
import { FieldArray } from "formik";
import PropTypes from "prop-types";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateQuestion from "../CreateQuestion/CreateQuestion";
import CreateAndRemoveAnswers from "../CreateAndRemoveAnswers/CreateAndRemoveAnswers";
import DetermineCorrectAnswer from "../DetermineCorrectAnswer/DetermineCorrectAnswer";
import AddQuestionElements from "../AddQuestionElements/AddQuestionElements";
import FormError from "../../FormError/FormError";
import { createQuizPropTypes } from "../../../config/propTypes";
import "./CreateQuestionsAndAnswers.css";
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */

const questionLimit = 5;

const CreateQuestionsAndAnswers = ({
  formik,
  handleIncreaseQuestionCount,
  handleDecreaseQuestionCount,
  notEnoughQuestionsError,
  deleteNotEnoughQuestionsError
}) => {
  const handleAddQuestion = (push) => {
    push({
      question: "",
      answers: [
        {
          answerContent: "",
          isCorrectAnswer: false
        },
        {
          answerContent: "",
          isCorrectAnswer: false
        }
      ],
      explanation: "",
      learnMore: ""
    });
    handleIncreaseQuestionCount();
    deleteNotEnoughQuestionsError();
  };

  const handleDeleteQuestion = (remove, index) => {
    handleDecreaseQuestionCount();
    remove(index);
  };

  return (
    <FieldArray name="questions">
      {({ push, remove }) => (
        <>
          {/* {JSON.stringify(formik.values)} */}
          {(formik.values.questions.length > 0) &&
            formik.values.questions.map((question, index) => (
              <div className="createQuestionsAndAnswers" key={index}>
                <button
                  className="createQuestionsAndAnswers__remove__question__button button"
                  type="button"
                  /* Accessibilité */
                  aria-label={`supprimer la question ${index + 1}`}
                  onClick={() => handleDeleteQuestion(remove, index)}
                >
                  <FontAwesomeIcon icon={faX} className="createQuestionsAndAnswers__remove__question__button__icon" />
                </button>
                <CreateQuestion formik={formik} index={index} />
                <FieldArray name={`questions.${index}.answers`}>
                  {({ push, remove }) => (
                    <>
                      {question && question.answers && question.answers.map((answer, idx) => (
                        <div key={idx}>
                          <CreateAndRemoveAnswers formik={formik} index={index} idx={idx} question={question} remove={remove} />
                          <DetermineCorrectAnswer formik={formik} index={index} idx={idx} />
                        </div>
                      ))}
                      <AddQuestionElements push={push} formik={formik} index={index} />
                    </>
                  )}
                </FieldArray>
              </div>
            ))}
          {(formik.values.questions.length < questionLimit) && (
            <div className="createQuestionsAndAnswers__add__question">
              {notEnoughQuestionsError && <FormError errorContent={notEnoughQuestionsError} />}
              <button
                className="createQuestionsAndAnswers__add__question__button button"
                type="button"
                value="Ajouter une question"
                onClick={() => handleAddQuestion(push)}
              >
                + Ajouter une question
              </button>
            </div>
          )}
        </>
      )}
    </FieldArray>
  );
};

CreateQuestionsAndAnswers.propTypes = {
  formik: PropTypes.shape(createQuizPropTypes),
  handleIncreaseQuestionCount: PropTypes.func.isRequired,
  handleDecreaseQuestionCount: PropTypes.func.isRequired,
  notEnoughQuestionsError: PropTypes.func.isRequired,
  deleteNotEnoughQuestionsError: PropTypes.func.isRequired
};

export default CreateQuestionsAndAnswers;
