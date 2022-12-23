import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./Login.css";
import { useFormik } from "formik";
import logoApp from "../../assets/logoApp.svg";
import useAuth from "../../hooks/useAuth";
import EnterEmail from "../../components/Authentification/EnterEmail/EnterEmail";
import EnterPassword from "../../components/Authentification/EnterPassword/EnterPassword";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import errorDisplayed from "../../config/error";

const SIGNUP_URL_FRONTEND = "/signup";
const LoginValue = "Valider";

const Login = () => {
  const { login } = useAuth();
  const [submitError, setSubmitError] = useState();

  const showServerError = () => {
    setSubmitError(errorDisplayed.server);
  };
  const showInvalidCredentialsError = () => {
    setSubmitError(errorDisplayed.invalidCredentials);
  };
  const deleteSubmitError = () => {
    setSubmitError("");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Champs obligatoire"),
      password: Yup.string()
        .required("Champs obligatoire"),
    }),

    onSubmit: async (values) => {
      login(values, showInvalidCredentialsError, showServerError, () => {});
    }
  });

  return (
    <main className="login">
      <img src={logoApp} className="login__logo" alt="" />
      <h1 className="login__title"> Se connecter</h1>
      <form onSubmit={formik.handleSubmit} className="login__form" method="post">
        <EnterEmail formik={formik} deleteSubmitError={deleteSubmitError} />
        <EnterPassword formik={formik} deleteSubmitError={deleteSubmitError} />
        <SubmitButton value={LoginValue} submitError={submitError} />
      </form>
      <p className="login__question">Nouveau sur la plateforme ?</p>
      <Link to={SIGNUP_URL_FRONTEND} className="login__link__signup">Créer un compte</Link>
    </main>
  );
};

export default Login;
