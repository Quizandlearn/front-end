import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import errorDisplayed from "../../../config/error";
import useChangeConnectedUser from "../../../hooks/useChangeConnectedUser";
import FormError from "../../FormError/FormError";

const ChangePersonalData = ({ data, refresh, isEditing, setIsEditing }) => {
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

  const { sendChangedUserData } = useChangeConnectedUser();

  const [submitError, setSubmitError] = useState("");

  const cancelButton = "Annuler";
  const saveButton = "Enregistrer";

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

  const nameError = getNameError(formik);
  const surnameError = getSurnameError(formik);
  const emailError = getEmailError(formik);

  const { values, handleChange, handleBlur, handleSubmit } = formik;
  const { name, surname, email } = values;

  return (
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
            aria-describedby={surnameError && "error-content-accessibility"}
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
  );
};

export default ChangePersonalData;
