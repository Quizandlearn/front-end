/* eslint-disable */
import "./Login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoBlue from "../../assets/logoBlue.png";
import useAuth from "../../hooks/useAuth";

const SIGNUP_URL_FRONTEND = "/signup";

const Login = () => {
  const { login } = useAuth();

  const [errMsg, setErrMsg] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const formik = useFormik({
    // Le state d'email et password est initalisé à "" - on utilise la librairie UseFormik
    initialValues: {
      email: "",
      password: "",
    },

    // erreurs qui vont s'afficher (Yup est une librairie qui marche avec Formik)
    validationSchema: Yup.object({
      email: Yup.string().required("Champ obligatoire"),
      password: Yup.string().required("Champ obligatoire"),
    }),

    // Submit du formulaire au serveur
    onSubmit: async (values) => {
      login(values, (error) => {
        setErrMsg(error);
      });
    },
  });

  // Usestate pour voir ou ne pas voir le mot de passe
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="loginContainer">
      <br />
      <img src={LogoBlue} id="logoLogIn" alt="" />
      <h1 id="LogInTitre"> Se Connecter</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="field logInForm">
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            autoComplete="on"
            onChange={formik.handleChange}
            // handleBlur permet de montrer à l'utilisateur les erreurs quand il se trouve dans le champs
            // sans attendre qu'il ait submit le formulaire
            onBlur={formik.handleBlur}
            value={formik.values.email}
            maxLength="24"
            placeholder="E-mail"
          />
          {/* Si la personne se trouve dans le champs et il y a des erreurs dans l'e-mail, alors on verra les erreurs */}
          {formik.touched.email && formik.errors.email ? (
            <span className="errorMessageLogIn">
              <FontAwesomeIcon icon={faInfoCircle} className="errorIconLogIn" />
              <p className="errorLogIn">{formik.errors.email}</p>
            </span>
          ) : null}
        </div>

        <div className="field logInForm passwordContainer">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            autoComplete="on"
            type={passwordShown ? "text" : "password"}
            className="input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            maxLength="24"
            placeholder="password"
          />

          <button id="passwordEye" onClick={togglePasswordVisiblity}>
            <FontAwesomeIcon icon={faEye} className="eye" />
          </button>

          {formik.touched.password && formik.errors.password ? (
            <span className="errorMessageLogIn">
              <FontAwesomeIcon icon={faInfoCircle} className="errorIconLogIn" />
              <p className="errorLogIn">{formik.errors.password}</p>
            </span>
          ) : null}
        </div>

        {/* Messages d'erreurs du serveur ou mauvais identifiants: */}
        {errMsg && (
          <span className="errorMessageLogIn">
            <FontAwesomeIcon icon={faInfoCircle} className="errorIconLogIn" />
            <p id="accountErrorLogIn">{errMsg}</p>
          </span>
        )}

        <div className="logInSubmit">
          <input
            className="button logInSubmitButton"
            type="submit"
            value="Log In"
          />
        </div>
      </form>

      <br />
      <p id="newcomerQuestion">Nouveau sur la plateforme ? </p>
      <Link to={SIGNUP_URL_FRONTEND} id="linkToOtherPage">
        Inscrivez-vous
      </Link>
    </div>
  );
};

export default Login;
