import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./Login.css";
import { useFormik } from "formik";
import LogoBlue from "../../assets/logoBlue.png";
import useAuth from "../../hooks/useAuth";
import EnterEmail from "../../components/User/EnterEmail/EnterEmail";
import EnterPassword from "../../components/User/EnterPassword/EnterPassword";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
/* eslint-disable no-unused-vars */

const SIGNUP_URL_FRONTEND = "/signup";
const LoginValue = "Login";

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
    <div className="login-container">
      <img src={LogoBlue} id="logo-login" alt="" />
      <h1 id="login-titre"> Se Connecter</h1>
      <form onSubmit={formik.handleSubmit}>
        <EnterEmail formik={formik} />
        <EnterPassword formik={formik} />
        <SubmitButton value={LoginValue} />
      </form>
      <p id="newcomer-question">Nouveau sur la plateforme ?</p>
      <Link to={SIGNUP_URL_FRONTEND} id="link-to-other-page">Inscrivez-vous</Link>
    </div>
  );
};

export default Login;
