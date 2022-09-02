import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./Login.css";
import { useFormik } from "formik";
import logoApp from "../../assets/logoApp.svg";
import useAuth from "../../hooks/useAuth";
import EnterEmail from "../../components/User/EnterEmail/EnterEmail";
import EnterPassword from "../../components/User/EnterPassword/EnterPassword";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
/* eslint-disable no-unused-vars */

const SIGNUP_URL_FRONTEND = "/signup";
const LoginValue = "Valider";

const Login = () => {
  const { login } = useAuth();
  const [errMsg, setErrMsg] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Champ obligatoire"),
      password: Yup.string()
        .required("Champ obligatoire"),
    }),

    onSubmit: async (values) => {
      login(values, (error) => {
        setErrMsg(error);
      });
    }
  });

  return (
    <div className="login">
      <img src={logoApp} className="login__logo" alt="" />
      <h1 className="login__title"> Se connecter</h1>
      <form onSubmit={formik.handleSubmit} className="login__form">
        <EnterEmail formik={formik} />
        <EnterPassword formik={formik} />
        <SubmitButton value={LoginValue} />
      </form>
      <p className="login__question">Nouveau sur la plateforme ?</p>
      <Link to={SIGNUP_URL_FRONTEND} className="login__link__signup">Créer un compte</Link>
    </div>
  );
};

export default Login;
