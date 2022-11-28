import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, ModalContents, ModalOpenButton } from "../../Modal/modal";
import { Button, FormGroup, Input } from "../ModalStyling/ModalStyling";
import useChangePassword from "../../../hooks/useChangePassword";
import FormError from "../../FormError/FormError";
import errorDisplayed from "../../../config/error";

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */

const getPasswordError = (formik) => {
  let touched = false;
  if (formik.touched && formik.touched.password) {
    touched = true;
  }
  if (touched && formik.errors && formik.errors.password) {
    return formik.errors.password;
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

const PasswordForm = ({
  onSubmit,
  formik,
  submitButton,
  deleteSubmitError,
}) => {
  const { handleChange, handleBlur, values } = formik;
  const passwordError = getPasswordError(formik);
  const confirmedPasswordError = getConfirmedPasswordError(formik);

  const { currentPassword, newPassword, updatedConfirmedPassword } = values;
  return (
    <form
      onSubmit={onSubmit}
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
          aria-invalid={passwordError}
          aria-describedby={passwordError && "error-content-accessibility"}
          /* Formik */
          name="currentPassword"
          value={currentPassword}
          onChange={handleChange}
          onBlur={(e) => {
            handleBlur(e);
            deleteSubmitError();
          }}
        />
        {passwordError && <FormError errorContent={passwordError} />}
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
          aria-invalid={passwordError}
          aria-describedby={passwordError && "error-content-accessibility"}
          /* Formik */
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
          onBlur={(e) => {
            handleBlur(e);
            deleteSubmitError();
          }}
        />
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
          aria-invalid={confirmedPasswordError}
          aria-describedby={
            confirmedPasswordError && "error-content-accessibility"
          }
          /* Formik */
          name="updatedConfirmedPassword"
          value={updatedConfirmedPassword}
          onChange={handleChange}
          onBlur={(e) => {
            handleBlur(e);
            deleteSubmitError();
          }}
        />
      </FormGroup>
      <div>
        {React.cloneElement(submitButton, {
          type: "submit",
        })}
      </div>
    </form>
  );
};

const ChangePasswordForm = ({ setIsEditing, data }) => {
  const { changePassword } = useChangePassword();
  const [submitError, setSubmitError] = useState("");
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,64}$/;

  const deleteSubmitError = () => {
    setSubmitError("");
  };

  const showServerError = () => {
    setSubmitError(errorDisplayed.server);
  };

  // function handleSubmit(currentPassword, updatedConfirmedPassword) {
  //   changePassword(currentPassword, updatedConfirmedPassword);
  // }

  const changePasswordButton = "Changer mot de passe";
  const profileName = "Nom";
  const profileSurname = "Prénom";
  const profileEmail = "Email";
  const modifyButton = "Modifier";
  const saveButton = "Enregistrer";

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
          [Yup.ref("password"), null],
          "Les mots de passe saisis ne sont pas idéntiques"
        )
        .required("Champs obligatoire"),
    }),

    onSubmit: async (values) => {
      console.log("values", values);
      changePassword(values, showServerError, () => {});
    },
  });

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
              onSubmit={formik.handleSubmit}
              formik={formik}
              submitButton={<Button>{saveButton}</Button>}
              deleteSubmitError={deleteSubmitError}
            />
          </ModalContents>
        </Modal>
      </div>
    </>
  );
};

export default ChangePasswordForm;
