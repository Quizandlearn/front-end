/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";
import "bootstrap/dist/css/bootstrap-reboot.css";

import React, { useState } from "react";
import PropTypes from "prop-types";
import "@reach/dialog/styles.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormError from "../../FormError/FormError";
import "../../../pages/MyProfile/MyProfile.css";
import useChangeConnectedUser from "../../../hooks/useChangeConnectedUser";
import MyProfilePersonalImage from "../MyProfilePersonalImage/MyProfilePersonalImage";
import errorDisplayed from "../../../config/error";
import { Button, FormGroup, Input } from "../MyProfileLibForm/MyProfileLibForm";
import { Modal, ModalContents, ModalOpenButton } from "../../Modal/modal";
import useChangePassword from "../../../hooks/useChangePassword";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-one-expression-per-line */

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

function PasswordForm({ onSubmit, submitButton }) {
  const newPasswordRef = React.useRef();
  const confirmedPasswordRef = React.useRef();
  const currentPasswordRef = React.useRef();
  const [error, setError] = useState("");
  const [errorRegex, setErrorRegex] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedConfirmedPassword = confirmedPasswordRef.current.value;
    const currentPassword = currentPasswordRef.current.value;

    onSubmit(currentPassword, updatedConfirmedPassword);
  };

  const handleInputRegexValidation = () => {
    function validateNewPassword(newPassword) {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/;
      if (regex.test(newPassword)) {
        return true;
      }

      return false;
    }

    const isTruePassword = validateNewPassword(newPasswordRef.current.value);

    setErrorRegex(
      isTruePassword
        ? null
        : "Le mot de passe doit contenir au minimum 8 caractères : au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre"
    );
  };

  const handleInputChange = () => {
    const firstPassword = newPasswordRef.current.value;
    const secondPassword = confirmedPasswordRef.current.value;

    const isValid = firstPassword === secondPassword;

    setError(isValid ? null : "Oups ... il y a une difference");
  };

  const handleInputPasswordValidation = () => {};

  const isButtonDisabled = error ? "secondary" : "primary";

  return (
    <form
      onSubmit={handleFormSubmit}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        "> div": {
          margin: "10px auto",
          width: "100%",
          maxWidth: "300px",
        },
      }}
    >
      <FormGroup>
        <label htmlFor="newPassword">Le mot de passe actuel</label>
        <Input
          id="currentPassword"
          type="password"
          placeholder="Le mot de passe actuel"
          ref={currentPasswordRef}
          onChange={handleInputPasswordValidation}
        />
        <div>
          <span style={{ color: "red" }}>{errorRegex}</span>
        </div>
      </FormGroup>
      <FormGroup>
        <label htmlFor="newPassword">Nouveau mot de passe</label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Mot de passe"
          ref={newPasswordRef}
          onChange={handleInputRegexValidation}
        />
        <div>
          <span style={{ color: "red" }}>{errorRegex}</span>
        </div>
      </FormGroup>
      <FormGroup>
        <label htmlFor="updatedConfirmedPassword">
          Confirmation du mot de passe
        </label>
        <Input
          id="updatedConfirmedPassword"
          type="password"
          placeholder="Confirmation du mot de passe"
          ref={confirmedPasswordRef}
          onChange={handleInputChange}
        />
        <div>
          <span style={{ color: "red" }}>{error}</span>
        </div>
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          {
            type: "submit",
            disabled: error,
            variant: isButtonDisabled,
          },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children])
        )}
      </div>
    </form>
  );
}

const MyProfilePersonalData = ({ data, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { sendChangedUserData } = useChangeConnectedUser();
  const [submitError, setSubmitError] = useState("");
  const { changePassword } = useChangePassword();

  const showServerError = () => {
    setSubmitError(errorDisplayed.server);
  };

  const deleteSubmitError = () => {
    setSubmitError("");
  };

  function handlePassword(currentPassword, updatedConfirmedPassword) {
    changePassword(currentPassword, updatedConfirmedPassword);
  }

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
  const cancelButton = "Annuler";

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
              <button className="myProfile__editButton" type="submit">
                {cancelButton}
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
              <Modal>
                <ModalOpenButton>
                  <button className="myProfile__editButton" type="button">
                    {changePasswordButton}
                  </button>
                </ModalOpenButton>
                <ModalContents aria-label="Password form" title="Password">
                  <PasswordForm
                    onSubmit={handlePassword}
                    submitButton={<Button>Enregistrer</Button>}
                  />
                </ModalContents>
              </Modal>
            </div>
          </>
        )}
      </div>
    </div>
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
