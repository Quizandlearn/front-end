import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, ModalContents, ModalOpenButton } from "../../Modal/modal";
import {
  Button,
  FormGroup,
  Input,
  Spinner,
} from "../ModalStyling/ModalStyling";
import useChangePassword from "../../../hooks/useChangePassword";
import FormError from "../../FormError/FormError";
import errorDisplayed from "../../../config/error";

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */

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

const PasswordForm = ({ submitButton, refresh }) => {
  const [submitError, setSubmitError] = useState("");

  const deleteSubmitError = () => {
    setSubmitError("");
  };
  const { changePassword, isLoading } = useChangePassword();

  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/;

  const showServerError = () => {
    setSubmitError(errorDisplayed.server);
  };

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
      changePassword(values, showServerError, () => {});
      setTimeout(() => refresh(), "500");
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
        <label htmlFor="currentPassword">Le mot de passe actuel</label>
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
          <FormError errorContent={currentPasswordError} />
        )}
      </FormGroup>
      <FormGroup>
        <label htmlFor="newPassword">Nouveau mot de passe</label>
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
        {newPasswordError && <FormError errorContent={newPasswordError} />}
      </FormGroup>
      <FormGroup>
        <label htmlFor="updatedConfirmedPassword">
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
          <FormError errorContent={updatedConfirmedPasswordError} />
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
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
        )}
      </div>
    </form>
  );
};

const ChangePasswordForm = ({ setIsEditing, data, refresh }) => {
  const changePasswordButton = "Changer mot de passe";
  const profileName = "Nom";
  const profileSurname = "Prénom";
  const profileEmail = "Email";
  const modifyButton = "Modifier";
  const saveButton = "Enregistrer";

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
              refresh={refresh}
              submitButton={<Button>{saveButton}</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </>
  );
};

export default ChangePasswordForm;
