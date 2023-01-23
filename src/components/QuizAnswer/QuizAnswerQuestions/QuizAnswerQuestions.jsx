import React from "react";
import PropTypes from "prop-types";
import "./QuizAnswerQuestions.css";
import FormError from "../../FormError/FormError";
import { questionsPropTypes } from "../../../config/propTypes";

const QuizAnswerQuestions = ({ formik, questions, questionErrors }) => {
  const { handleChange } = formik;

  return (
    <>
      {questions.map((question, index) => (
        <section className="quizAnswerQuestion" key={question._id}>
          <p className="quizAnswerQuestion__questionNumber">{index + 1}</p>
          {" "}
          <div className="quizAnswerQuestion__questionSection">
            <h2 className="quizAnswerQuestion__questionSection__title">{question.title}</h2>
            {question.choices.map((choice, idx) => (
              /* eslint-disable implicit-arrow-linebreak */
              <div key={choice._id} className="quizAnswerQuestion__questionSection__inputContainer">
                <input
                  type="checkbox"
                  id={`questions.${index}.choices.${idx}.isChecked`}
                  name={`questions.${index}.choices.${idx}.isChecked`}
                  onChange={handleChange}
                  className="checkbox"
                />
                <label htmlFor={`questions.${index}.choices.${idx}.isChecked`} className="quizAnswerQuestion__questionSection__label">
                  {choice.content}
                </label>
              </div>
            ))}
          </div>
          {(questionErrors && questionErrors[`question-${index}`]) !== null &&
            questionErrors[`question-${index}`] === 0 && (
              <FormError errorContent="Veuillez rentrer au moins 1 réponse" />
          )}
        </section>
      ))}
    </>
  );
};

QuizAnswerQuestions.propTypes = {
  /* eslint-disable react/require-default-props */
  formik: PropTypes.shape({
    handleChange: PropTypes.func.isRequired
  }),
  questions: questionsPropTypes.questions,
  questionErrors: PropTypes.shape({})
};

export default QuizAnswerQuestions;
