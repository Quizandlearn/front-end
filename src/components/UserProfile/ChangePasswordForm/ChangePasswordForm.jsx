import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormGroup, Input } from "../ModalStyling/ModalStyling";
import useChangePassword from "../../../hooks/useChangePassword";
import PasswordFormikError from "../../PasswordFormikError/PasswordFormikError";
import errorDisplayed from "../../../config/error";
import ReusableSubmitButton from "../../SubmitButton/ReusableSubmitButton";
import "../../../pages/MyProfile/MyProfile.css";
import { Modal, ModalContents, ModalOpenButton } from "../../Modal/modal";

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-wrap-multilines */

const getCurrentPasswordError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.currentPassword) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.currentPassword) {
    return formik.errors.currentPassword;
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

const getUpdatedConfirmedPasswordError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.updatedConfirmedPassword) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.updatedConfirmedPassword) {
    return formik.errors.updatedConfirmedPassword;
  }
  return undefined;
};

const PasswordForm = ({ setSubmitError, submitButton }) => {
  const successMessage = "Le mot de passe a été mis à jour!";
  const deleteSubmitError = () => {
    setSubmitError("");
  };

  const showInvalidCredentialsError = () => {
    setSubmitError(errorDisplayed.invalidCredentials);
  };

  const showServerError = () => {
    setSubmitError(errorDisplayed.server);
  };

  const { changePassword, responseStatus } = useChangePassword();

  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/;

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      updatedConfirmedPassword: "",
    },

    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Champs obligatoire"),
      newPassword: Yup.string()
        .matches(
          PASSWORD_REGEX,
          "Le mot de passe doit contenir au minimum 8 caractères : au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre"
        )
        .required("Champs obligatoire"),
      updatedConfirmedPassword: Yup.string()
        .oneOf(
          [Yup.ref("newPassword"), null],
          "Les mots de passe saisis ne sont pas idéntiques"
        )
        .required("Champs obligatoire"),
    }),

    onSubmit: async (values) => {
      changePassword(
        values,
        showInvalidCredentialsError,
        showServerError,
        () => {}
      );
    },
  });

  const currentPasswordError = getCurrentPasswordError(formik);
  const newPasswordError = getNewPasswordError(formik);
  const updatedConfirmedPasswordError =
    getUpdatedConfirmedPasswordError(formik);

  return (
    <form
      onSubmit={formik.handleSubmit}
      method="post"
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
        <label htmlFor="currentPassword" className="myProfile__form__label__password">Le mot de passe actuel</label>
        <Input
          id="currentPassword"
          type="password"
          className="myProfile__form__input"
          placeholder="Le mot de passe actuel"
          /* Accessibility */
          aria-required="true"
          aria-invalid={currentPasswordError}
          aria-describedby={
            currentPasswordError && "error-content-accessibility"
          }
          /* Formik */
          name="currentPassword"
          value={formik.currentPassword}
          onChange={formik.handleChange}
          onBlur={(e) => {
            formik.handleBlur(e);
            deleteSubmitError();
          }}
        />
        {currentPasswordError && (
          <PasswordFormikError errorContent={currentPasswordError} />
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor="newPassword" className="myProfile__form__label__password">Nouveau mot de passe</label>
        <Input
          id="newPassword"
          type="password"
          className="myProfile__form__input"
          placeholder="Mot de passe"
          /* Accessibility */
          aria-required="true"
          aria-invalid={formik.newPasswordError}
          aria-describedby={newPasswordError && "error-content-accessibility"}
          /* Formik */
          name="newPassword"
          value={formik.newPassword}
          onChange={formik.handleChange}
          onBlur={(e) => {
            formik.handleBlur(e);
            deleteSubmitError();
          }}
        />
        {newPasswordError && <PasswordFormikError errorContent={newPasswordError} />}
      </FormGroup>
      <FormGroup>
        <label htmlFor="updatedConfirmedPassword" className="myProfile__form__label__password">
          Confirmation du mot de passe
        </label>
        <Input
          id="updatedConfirmedPassword"
          type="password"
          className="myProfile__form__input"
          placeholder="Confirmation du mot de passe"
          /* Accessibility */
          aria-required="true"
          aria-invalid={updatedConfirmedPasswordError}
          aria-describedby={
            updatedConfirmedPasswordError && "error-content-accessibility"
          }
          /* Formik */
          name="updatedConfirmedPassword"
          value={formik.updatedConfirmedPassword}
          onChange={formik.handleChange}
          onBlur={(e) => {
            formik.handleBlur(e);
            deleteSubmitError();
          }}
        />
        {updatedConfirmedPasswordError && (
          <PasswordFormikError errorContent={updatedConfirmedPasswordError} />
        )}
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          {
            type: "submit",
          },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children])
        )}
      </div>
      <div className="myProfile__form__label__success">{responseStatus.responseStatus === 200 ? successMessage : ""}</div>
    </form>
  );
};

const ChangePasswordForm = ({ setIsEditing, data }) => {
  const changePasswordButton = "Changer le mot de passe";
  const profileName = "Nom";
  const profileSurname = "Prénom";
  const profileEmail = "Email";
  const modifyButton = "Modifier";
  const saveButton = "Enregistrer";

  const [submitError, setSubmitError] = useState("");

  return (
    <>
      <div className="myProfile__form__fields__container">
        <div className="myProfile__form__field field">
          <label className="myProfile__form__label label">{profileName}</label>
          <p className="myProfile__form__text">{data.name}</p>
        </div>
        <div className="myProfile__form__field field">
          <label className="myProfile__form__label label">
            {profileSurname}
          </label>
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
        <Modal>
          <ModalOpenButton>
            <button className="myProfile__editButton" type="button">
              {changePasswordButton}
            </button>
          </ModalOpenButton>
          <ModalContents
            aria-label="Password form"
            title={changePasswordButton}
          >
            <PasswordForm
              setSubmitError={setSubmitError}
              submitButton={
                <ReusableSubmitButton
                  submitError={submitError}
                  style={{ width: "100%", padding: "10px" }}
                >
                  {saveButton}
                </ReusableSubmitButton>
              }
            />
          </ModalContents>
        </Modal>
      </div>
    </>
  );
};

export default ChangePasswordForm;
