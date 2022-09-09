import React, { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import "./CreateQuiz.css";
import CreateTitle from "../../components/Quiz/CreateTitle/CreateTitle";
import CreateDescription from "../../components/Quiz/CreateDescription/CreateDescription";
import SelectCategory from "../../components/Quiz/SelectCategory/SelectCategory";
import CreateQuestionsAndAnswers from "../../components/Quiz/CreateQuestionsAndAnswers/CreateQuestionsAndAnswers";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useCreateQuiz } from "../../hooks/useCreateQuiz";
/* eslint-disable no-unused-vars */

const sendQuiz = "Sauvegarder ce quiz";

const QuizCreation = () => {
  const [errMsg, setErrMsg] = useState("");
  const { createQuiz } = useCreateQuiz();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      questions: [
        {
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
        }
      ]
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Champ obligatoire")
        .max(80, "Le titre doit contenir au maximum 80 carcactères"),
      description: Yup.string()
        .required("Champ obligatoire")
        .max(400, "La description doit contenir au maximum 400 carcactères"),
      category: Yup.string()
        .required("Champ obligatoire"),
      questions: Yup.array().of(
        Yup.object().shape({
          question: Yup.string()
            .required("Champ obligatoire")
            .max(150, ""),
          answers: Yup.array().of(
            Yup.object().shape({
              answerContent: Yup.string()
                .required("Champ obligatoire")
                .max(150, "La réponse doit contenir au maximum 150 carcactères"),
            }),
            Yup.object().shape({
              answerContent: Yup.string()
                .required("Champ obligatoire")
                .max(150, "La réponse doit contenir au maximum 150 carcactères"),
            })
          ),
          explanation: Yup.string()
            .max(400, "L'explication doit contenir au maximum 400 carcactères"),
          learnMore: Yup.string()
            .url("L'URL doit commencer par https://")
        })
      )
    }),

    onSubmit: async (values) => {
      createQuiz(values, (error) => {
        setErrMsg(error);
      });
    }
  });

  return (
    <div className="quiz-creation-page-container">
      <FormikProvider value={formik}>
        <form className="quiz-creation-form-container" onSubmit={formik.handleSubmit}>
          <h1 className="title-quiz-creation">Création de Quiz</h1>
          <div className="section-container">
            <CreateTitle formik={formik} />
            <CreateDescription formik={formik} />
            <SelectCategory formik={formik} />
          </div>
          <CreateQuestionsAndAnswers formik={formik} />
          <SubmitButton value={sendQuiz} class="submitButton--mb30" />
        </form>
      </FormikProvider>
    </div>
  );
};

export default QuizCreation;
