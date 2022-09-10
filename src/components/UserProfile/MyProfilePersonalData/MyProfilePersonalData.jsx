import React, { useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormError from "../../FormError/FormError";
import "../../../pages/MyProfile/MyProfile.css";
import useChangeConnectedUser from "../../../hooks/useChangeConnectedUser";
import MyProfilePersonalImage from "../MyProfilePersonalImage/MyProfilePersonalImage";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */

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

const MyProfilePersonalData = ({ data, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { sendChangedUserData } = useChangeConnectedUser();
  const [errMsg, setErrMsg] = useState("");

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
      sendChangedUserData(values, (message) => {
        setErrMsg(message);
      });
      setIsEditing(!isEditing);
      refresh();
    }
  });

  const personalDataTitle = "A propos de moi";
  const profileName = "Nom";
  const profileSurname = "Prénom";
  const profileEmail = "Email";
  const modifyButton = "Modifier";
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
                  onBlur={handleBlur}
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
                  aria-describedby={surnameError && "error-content-accessibility"}
                  value={surname}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
                  required
                />
                {emailError && <FormError errorContent={emailError} />}
              </div>
            </div>
            <div className="myProfile__editButtonContainer">
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
                <label className="myProfile__form__label label">{profileName}</label>
                <p className="myProfile__form__text">{data.name}</p>
              </div>
              <div className="myProfile__form__field field">
                <label className="myProfile__form__label label">{profileSurname}</label>
                <p className="myProfile__form__text">{data.surname}</p>
              </div>
              <div className="myProfile__form__field field">
                <label className="myProfile__form__label label">{profileEmail}</label>
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
  refresh: PropTypes.func.isRequired
};

export default MyProfilePersonalData;
