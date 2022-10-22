import React from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import "./AnswerQuiz.css";
import AnswerQuizInformation from "../../components/QuizAnswer/QuizAnswerInformation/QuizAnswerInformation";
import QuizAnswerQuestions from "../../components/QuizAnswer/QuizAnswerQuestions/QuizAnswerQuestions";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

const sendReplies = "Envoyer";

const AnswerQuiz = () => {
  /* eslint-disable arrow-body-style */
  const location = useLocation();
  const { from } = location.state;

  const questions = [];
  /* eslint-disable no-plusplus */
  for (let i = 0; i < from.questions.length; i++) {
    const question = { question: [] };
    for (let j = 0; j < from.questions[i].choices.length; j++) {
      question.question.push({ choice: { isChecked: false } });
    }
    questions.push(question);
  }

  const formik = useFormik({
    initialValues: { questions },

  });

  // CHECK FORM BEFORE SUMBMIT - WORK IN PROGRESS (until line 59)

  // Check if user has checked answers
  const checkedQuestionsArray = [];
  for (let i = 0; i < formik.values.questions.length; i++) {
    let numberCheckedQuestions = 0;
    const questionArray = formik.values.questions;
    for (let j = 0; j < questionArray[i].question.length; j++) {
      const choiceValue = questionArray[i].question[j].choice.isChecked;
      if (choiceValue === true) {
        numberCheckedQuestions += 1;
      }
    }
    checkedQuestionsArray.push(numberCheckedQuestions);
  }
  // console.log(checkedQuestionsArray);

  // Create error messages when submitting
  for (let i = 0; i < checkedQuestionsArray.length; i++) {
    if (checkedQuestionsArray[i] === 0) {
      // console.log(`Veuillez cocher au moins une case pour la question ${i + 1}`);
    } else if (checkedQuestionsArray[i] > 2) {
      // console.log(`Veuillez cocher au maximum 2 cases pour la question ${i + 1}`);
    }
  }

  return (
    <main className="answerQuiz">
      <div className="answerQuiz__block">
        <h1 className="answerQuiz__block__title">Réponse Quiz</h1>
        <AnswerQuizInformation data={from} />
        <form method="post">
          <QuizAnswerQuestions data={from} formik={formik} />
          <SubmitButton value={sendReplies} />
        </form>
      </div>
    </main>
  );
};

export default AnswerQuiz;
