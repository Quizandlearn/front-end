import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signup.css";
import logoApp from "../../assets/logoApp.svg";
import useSignUp from "../../hooks/useSignUp";
import EnterName from "../../components/Authentification/EnterName/EnterName";
import EnterSurname from "../../components/Authentification/EnterSurname/EnterSurname";
import EnterEmail from "../../components/Authentification/EnterEmail/EnterEmail";
import EnterPassword from "../../components/Authentification/EnterPassword/EnterPassword";
import EnterConfirmedPassword from "../../components/Authentification/EnterConfirmedPassword/EnterConfirmedPassword";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
const LOGIN_URL_FRONTEND = "/";
const Inscription = "Inscription";

const Signup = () => {
  const { signup } = useSignUp();
  const [errMsg, setErrMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmedPassword: ""
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(45, "Prénom invalide")
        .required("Champ obligatoire"),
      surname: Yup.string()
        .max(45, "Nom invalide")
        .required("Champ obligatoire"),
      email: Yup.string()
        .email("Adresse email invalide")
        .required("Champ obligatoire"),
      password: Yup.string()
        .matches(PASSWORD_REGEX, "Le mot de passe doit contenir au minimum 8 caractères : au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre")
        .required("Champ obligatoire"),
      confirmedPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Les mots de passe saisis ne sont pas idéntiques")
        .required("Champ obligatoire")
    }),

    onSubmit: async (values) => {
      signup(values, (message) => {
        setErrMsg(message);
      });
    }
  });

  return (
    <div className="signup">
      <section className="signup__section">
        <img src={logoApp} className="signup__logo" alt="" />
        <h1 className="signup__title">Création de compte</h1>
        <form onSubmit={formik.handleSubmit} className="signup__form">
          <EnterName formik={formik} />
          <EnterSurname formik={formik} />
          <EnterEmail formik={formik} />
          <EnterPassword formik={formik} />
          <EnterConfirmedPassword formik={formik} />
          <SubmitButton value={Inscription} />
        </form>
        <p className="signup__question">Vous avez déjà un compte ?</p>
        <Link to={LOGIN_URL_FRONTEND} className="signup__link__login"> Connectez-vous</Link>
      </section>
    </div>
  );
};

export default Signup;
