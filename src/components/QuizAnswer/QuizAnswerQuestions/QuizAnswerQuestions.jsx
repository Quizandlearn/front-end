import React from "react";
import "./QuizAnswerQuestions.css";
/* eslint-disable react/jsx-wrap-multilines */

const getInputValue = (formik, index, idx) => {
  if (formik.values && formik.values.questions) {
    const { questions } = formik.values;
    if (questions[index] && questions[index].question) {
      const { question } = questions[index];
      if (question[idx] && question[idx].choice) {
        const { choice } = question[idx];
        const choiceValue = choice.isChecked;
        return choiceValue;
      }
    }
  }
  return undefined;
};

const QuizAnswerQuestions = ({ data, formik }) => {
  const { questions } = data;
  const { values, handleChange } = formik;
  return (
    <>
      {questions.map((question, index) => (
        <section className="quizAnswerQuestion">
          <div key={question._id}>
            <p className="quizAnswerQuestion__questionNumber">{index + 1}</p>
            {" "}
            <div className="quizAnswerQuestion__questionSection">
              <h2>{question.title}</h2>
              {question.choices.map((choice, idx) => (
                /* eslint-disable implicit-arrow-linebreak */
                <div>
                  <input
                    type="checkbox"
                    id={`questions.${index}.question.${idx}.choice.isChecked`}
                    key={choice._id}
                    value={getInputValue(formik, index, idx)}
                    onChange={(e) => { console.log(values); handleChange(e); }}
                  />
                  <label key={choice._id + choice._id} htmlFor={`questions.${index}.question.${idx}.choice.isChecked`}>
                    {choice.content}
                  </label>
                </div>))}
            </div>
          </div>
        </section>))}
    </>

  );
};

export default QuizAnswerQuestions;
