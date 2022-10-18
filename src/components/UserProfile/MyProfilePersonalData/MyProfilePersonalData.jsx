import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormError from "../../FormError/FormError";
import "../../../pages/MyProfile/MyProfile.css";
import useChangeConnectedUser from "../../../hooks/useChangeConnectedUser";
import MyProfilePersonalImage from "../MyProfilePersonalImage/MyProfilePersonalImage";
import errorDisplayed from "../../../config/error";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */

const getNameError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.name) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.name) {
    return formik.errors.name;
  }
  return undefined;
};

const getSurnameError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.surname) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.surname) {
    return formik.errors.surname;
  }
  return undefined;
};

const getEmailError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.email) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.email) {
    return formik.errors.email;
  }
  return undefined;
};

const getNewPasswordError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.newPassword) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.newPassword) {
    return formik.errors.newPassword;
  }
  return undefined;
};

const getConfirmedPasswordError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.confirmedPassword) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.confirmedPassword) {
    return formik.errors.confirmedPassword;
  }
  return undefined;
};

const MyProfilePersonalData = ({ data, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { sendChangedUserData } = useChangeConnectedUser();
  const [submitError, setSubmitError] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showServerError = () => {
    setSubmitError(errorDisplayed.server);
  };

  const deleteSubmitError = () => {
    setSubmitError("");
  };

  const formik = useFormik({
    initialValues: {
      name: data.name,
      surname: data.surname,
      email: data.email,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(45, "Prénom invalide")
        .required("Champs obligatoire"),
      surname: Yup.string()
        .max(45, "Nom invalide")
        .required("Champs obligatoire"),
      email: Yup.string()
        .email("Adress email invalide")
        .required("Champs obligatoire"),
    }),

    onSubmit: async (values) => {
      sendChangedUserData(values, showServerError, () => {});
      setIsEditing(!isEditing);
      refresh();
    },
  });

  const personalDataTitle = "A propos de moi";
  const profileName = "Nom";
  const profileSurname = "Prénom";
  const profileEmail = "Email";
  const modifyButton = "Modifier";
  const changePasswordButton = "Changer mot de passe";
  const saveButton = "Enregistrer";

  const nameError = getNameError(formik);
  const surnameError = getSurnameError(formik);
  const emailError = getEmailError(formik);

  const { values, handleChange, handleBlur, handleSubmit } = formik;
  const { name, surname, email } = values;

  return (
    <div className="myProfile__form">
      <div className="myProfile__form__photo__profile">
        <MyProfilePersonalImage />
      </div>
      <div className="myProfile__form__personal__data">
        <div htmlFor="title" className="myProfile__form__title">
          {personalDataTitle}
        </div>
        {isEditing && (
          <form onSubmit={handleSubmit}>
            <div className="myProfile__form__fields__container">
              <div className="myProfile__form__field field">
                <input
                  id="name"
                  className="myProfile__form__input"
                  type="text"
                  /* Accessibility */
                  aria-required="true"
                  aria-invalid={nameError}
                  aria-describedby={nameError && "error-content-accessibility"}
                  value={name}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    deleteSubmitError();
                  }}
                  required
                />
                {nameError && <FormError errorContent={nameError} />}
              </div>
              <div className="myProfile__form__field field">
                <input
                  id="surname"
                  className="myProfile__form__input"
                  type="text"
                  aria-required="true"
                  aria-invalid={surnameError}
                  aria-describedby={
                    surnameError && "error-content-accessibility"
                  }
                  value={surname}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    deleteSubmitError();
                  }}
                  required
                />
                {surnameError && <FormError errorContent={surnameError} />}
              </div>
              <div className="myProfile__form__field field">
                <input
                  id="email"
                  className="myProfile__form__input"
                  type="email"
                  aria-required="true"
                  aria-invalid={emailError}
                  aria-describedby={emailError && "error-content-accessibility"}
                  value={email}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    deleteSubmitError();
                  }}
                  required
                />
                {emailError && <FormError errorContent={emailError} />}
              </div>
            </div>
            <div className="myProfile__editButtonContainer">
              {submitError && <FormError errorContent={submitError} />}
              <button className="myProfile__editButton" type="submit">
                {saveButton}
              </button>
            </div>
          </form>
        )}
        {!isEditing && (
          <>
            <div className="myProfile__form__fields__container">
              <div className="myProfile__form__field field">
                <label className="myProfile__form__label label">
                  {profileName}
                </label>
                <p className="myProfile__form__text">{data.name}</p>
              </div>
              <div className="myProfile__form__field field">
                <label className="myProfile__form__label label">
                  {profileSurname}
                </label>
                <p className="myProfile__form__text">{data.surname}</p>
              </div>
              <div className="myProfile__form__field field">
                <label className="myProfile__form__label label">
                  {profileEmail}
                </label>
                <p className="myProfile__form__text">{data.email}</p>
              </div>
            </div>
            <div className="myProfile__editButtonContainer">
              <button
                className="myProfile__editButton"
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                {modifyButton}
              </button>
              <button
                className="myProfile__editButton"
                type="button"
                onClick={handleShow}
              >
                {changePasswordButton}
              </button>
              <Dialog
                aria-label="Password form"
                isOpen={show}
                onDismiss={handleClose}
              >
                <PasswordForm handleClose={handleClose} />
              </Dialog>
              ;
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const PasswordForm = ({ handleClose }) => {
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/;
  const [submitError, setSubmitError] = useState("");

  function changePassword(values) {
    alert("New password is ...", values);
  }

  const deleteSubmitError = () => {
    setSubmitError("");
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmedPassword: "",
    },

    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(
          PASSWORD_REGEX,
          "Le mot de passe doit contenir au minimum 8 caractères : au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre"
        )
        .required("Champs obligatoire"),
      confirmedPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Les mots de passe saisis ne sont pas idéntiques"
        )
        .required("Champs obligatoire"),
    }),

    onSubmit: async (values) => {
      changePassword(values, () => {});
    },
  });

  const newPasswordError = getNewPasswordError(formik);
  const confirmedPasswordError = getConfirmedPasswordError(formik);
  const { handleChange, handleBlur, values } = formik;
  const { newPassword, confirmedPassword } = values;

  // function handleFormSubmit() {
  //   const newPassword = confirmPasswordRef.current.value;
  //   alert(`You entered: ${newPassword}`);
  // }

  // const handleInputChange = () => {
  //   const firstPassword = passwordRef.current.value;
  //   const secondPassword = confirmPasswordRef.current.value;

  //   const isValid = firstPassword === secondPassword;

  //   setError(isValid ? null : "Doit correspondre à votre nouveau mot de passe");
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="new password">Nouveau mot de passe</label>
        <input
          ref={passwordRef}
          id="newPassword"
          type="password"
          placeholder="Mot de passe"
          /* Accessibility */
          aria-required="true"
          aria-invalid={newPasswordError}
          aria-describedby={newPasswordError && "error-content-accessibility"}
          /* Formik */
          value={newPassword}
          onChange={handleChange}
          onBlur={(e) => {
            handleBlur(e);
            deleteSubmitError();
          }}
          required
        />
        {newPasswordError && <FormError errorContent={newPasswordError} />}
        <label htmlFor="new password confirmation">
          Confirmation de mot de passe
        </label>
        <input
          onChange={handleChange}
          id="password"
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirmation du mot de passe"
          autoComplete="on"
          /* Accessibility */
          aria-required="true"
          aria-invalid={confirmedPasswordError}
          aria-describedby={
            confirmedPasswordError && "error-content-accessibility"
          }
          /* Formik */
          name="confirmedPassword"
          value={confirmedPassword}
          onBlur={(e) => {
            handleBlur(e);
            deleteSubmitError();
          }}
        />
      </div>
      <div>
        <button type="submit" variant="secondary" onClick={handleClose}>
          Annuler
        </button>
        <button type="submit" onClick={handleClose}>
          Enregistrer
        </button>
      </div>
    </form>
  );
};

MyProfilePersonalData.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
};

export default MyProfilePersonalData;
