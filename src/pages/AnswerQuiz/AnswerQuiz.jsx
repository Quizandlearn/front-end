import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import "./AnswerQuiz.css";
import AnswerQuizInformation from "../../components/QuizAnswer/QuizAnswerInformation/QuizAnswerInformation";
import QuizAnswerQuestions from "../../components/QuizAnswer/QuizAnswerQuestions/QuizAnswerQuestions";
import QuizAnswerScore from "../../components/QuizAnswer/QuizAnswerScore/QuizAnswerScore";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Loading from "../../assets/Loading";
import { useAnswerQuiz } from "../../hooks/useAnswerQuiz";

const sendReplies = "Envoyer";

const AnswerQuiz = () => {
  /* eslint-disable arrow-body-style */
  const location = useLocation();
  const { from } = location.state;
  const { questions } = from;
  const { answerQuiz, result } = useAnswerQuiz();
  const [questionErrors, setQuestionErrors] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [result.data]);

  const formik = useFormik({
    initialValues: {},

    onSubmit: async (values) => {
      // after user clicked, modification choice.isChecked
      if (Object.keys(values).length) {
        questions.forEach((question, questionIndex) => {
          question.choices.forEach((choice, choiceIndex) => {
            const answer = values.questions[questionIndex]
              ? values.questions[questionIndex].choices[choiceIndex]
              : null;
            if (answer?.isChecked && answer.isChecked.indexOf("on") !== -1) {
              /* eslint-disable no-param-reassign */
              choice.isChecked = true;
            } else {
              choice.isChecked = false;
            }
          });
        });
      }

      const counter = {};

      questions.forEach((question, questionIndex) => {
        question.choices.forEach((choice) => {
          if (!counter[`question-${questionIndex}`]) {
            counter[`question-${questionIndex}`] = 0;
          }
          if (choice.isChecked) {
            /* eslint-disable no-plusplus */
            counter[`question-${questionIndex}`]++;
          }
        });
      });

      let error = false;

      Object.keys(counter).forEach((questionName) => {
        const questionNumber = counter[questionName];
        if (questionNumber === 0) {
          error = true;
        }
      });

      if (error) {
        setQuestionErrors(counter);
      } else {
        setQuestionErrors({});

        from.questions = questions;

        // points logic to calculate percentage
        const goodAnswers = {};
        questions.forEach((question, questionIndex) => {
          question.choices.forEach((choice) => {
            if (!goodAnswers[`question-${questionIndex}`]) {
              goodAnswers[`question-${questionIndex}`] = {
                isCorrect: 0,
                goodAnswer: 0,
              };
            }
            if (choice.isCorrect) {
              goodAnswers[`question-${questionIndex}`].isCorrect++;
            }
            if (choice.isChecked && !choice.isCorrect) {
              goodAnswers[`question-${questionIndex}`].goodAnswer--;
            } else if (choice.isChecked && choice.isCorrect) {
              goodAnswers[`question-${questionIndex}`].goodAnswer++;
            }
          });
        });

        let points = 0;
        Object.keys(goodAnswers).map((question) => {
          const questionPoints = goodAnswers[question];
          if (questionPoints.goodAnswer >= questionPoints.isCorrect) {
            return points++;
          }
          return undefined;
        });

        const percentageScore =
          (points * 100) / Object.keys(goodAnswers).length;

        // post the answer + percentage good answers
        await answerQuiz(from, Math.floor(percentageScore));
      }
    },
  });

  return (
    <main className="answerQuiz">
      <div className="answerQuiz__block">
        {result.loading && <Loading />}
        {!result.loading && Object.keys(result.data).length ? (
          <QuizAnswerScore result={result} />
        ) : (
          <>
            <h1 className="answerQuiz__block__title">Réponse Quiz</h1>
            <AnswerQuizInformation data={from} />
            <form
              method="post"
              onSubmit={formik.handleSubmit}
              className="answerQuiz__block__form"
            >
              <QuizAnswerQuestions
                formik={formik}
                questions={questions}
                questionErrors={questionErrors}
              />
              <SubmitButton value={sendReplies} submitError={result.error} />
            </form>
          </>
        )}
      </div>
    </main>
  );
};

export default AnswerQuiz;
