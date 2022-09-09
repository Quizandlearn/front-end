import React, { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import "./CreateQuiz.css";
import CreateTitle from "../../components/QuizCreation/CreateTitle/CreateTitle";
import CreateDescription from "../../components/QuizCreation/CreateDescription/CreateDescription";
import SelectCategory from "../../components/QuizCreation/SelectCategory/SelectCategory";
import CreateQuestionsAndAnswers from "../../components/QuizCreation/CreateQuestionsAndAnswers/CreateQuestionsAndAnswers";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useCreateQuiz } from "../../hooks/useCreateQuiz";
/* eslint-disable no-unused-vars */

const sendQuiz = "Envoyer";

const CreateQuiz = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  const [correctAnswerCount, SetCorrectAnswerCount] = useState(0);
  const [notEnoughQuestionsError, setNotEnoughQuestionsError] = useState("");
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
        .min(10, "Le titre doit contenir au minimum 10 caractères")
        .max(80, "Le titre doit contenir au maximum 80 caractères"),
      description: Yup.string()
        .required("Champ obligatoire")
        .min(20, "Le description doit contenir au minimum 20 caractères")
        .max(400, "La description doit contenir au maximum 400 caractères"),
      category: Yup.string()
        .required("Champ obligatoire"),
      questions: Yup.array().of(
        Yup.object().shape({
          question: Yup.string()
            .required("Champ obligatoire")
            .min(20, "Le question doit contenir au minimum 20 caractères")
            .max(150, "La question doit contenir au maximum 150 caractères"),
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
            .min(20, "L'explication doit contenir au minimum 20 caractères")
            .max(400, "L'explication doit contenir au maximum 400 carcactères"),
          learnMore: Yup.string()
            .url("L'URL doit commencer par http://")
        })
      )
    }),

    onSubmit: async (values) => {
      if (questionCount < 3) {
        setNotEnoughQuestionsError("Veuillez rentrer au moins 3 questions");
      } else {
        createQuiz(values, (error) => {
          setErrorMessage(error);
        });
      }
    }
  });

  const handleIncreaseQuestionCount = () => {
    setQuestionCount(questionCount + 1);
  };
  const handleDecreaseQuestionCount = () => {
    setQuestionCount(questionCount - 1);
  };
  const deleteNotEnoughQuestionsError = () => {
    setNotEnoughQuestionsError("");
  };

  return (
    <div className="createQuiz__page">
      <FormikProvider value={formik}>
        <form className="createQuiz__form" onSubmit={formik.handleSubmit}>
          <h1 className="createQuiz__page__title">Création de Quiz*</h1>
          <div className="createQuiz__information">
            <CreateTitle formik={formik} />
            <CreateDescription formik={formik} />
            <SelectCategory formik={formik} />
          </div>
          <CreateQuestionsAndAnswers
            formik={formik}
            handleIncreaseQuestionCount={handleIncreaseQuestionCount}
            handleDecreaseQuestionCount={handleDecreaseQuestionCount}
            notEnoughQuestionsError={notEnoughQuestionsError}
            deleteNotEnoughQuestionsError={deleteNotEnoughQuestionsError}
          />
          <SubmitButton value={sendQuiz} class="submitButton" />
          <p className="createQuiz__explanation">
            *Afin de pouvoir envoyer votre quiz, ceci doit contenir
            {" "}
            <span className="createQuiz__explanation__undelined">au moins 3 questions</span>
            , chaque question doit contenir
            {" "}
            <span className="createQuiz__explanation__undelined">au moins 2 réponses</span>
            {" "}
            et les questions doivent avoir
            {" "}
            <span className="createQuiz__explanation__undelined">1 ou 2 réponses correctes</span>
            . Pour une meilleure expérience utilisateur, vous pouvez également ajouter une explication ou un lien pour argumenter les réponses correctes.
          </p>
        </form>
      </FormikProvider>
    </div>
  );
};

export default CreateQuiz;
