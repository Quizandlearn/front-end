import React, { useState } from "react";
import { Modal, ModalContents, ModalOpenButton } from "../../Modal/modal";
import {
  FormGroup,
  Input,
  Button,
  Spinner,
} from "../ModalStyling/ModalStyling";
import useChangePassword from "../../../hooks/useChangePassword";
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */

const PasswordForm = ({ isLoading, onSubmit, refresh, submitButton }) => {
  const currentPasswordRef = React.useRef();
  const newPasswordRef = React.useRef();
  const confirmedPasswordRef = React.useRef();
  const [error, setError] = useState(" ");
  const [errorRegex, setErrorRegex] = useState(" ");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedConfirmedPassword = confirmedPasswordRef.current.value;
    const currentPassword = currentPasswordRef.current.value;

    onSubmit(currentPassword, updatedConfirmedPassword);
    refresh();
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
        <label htmlFor="currentPassword">Le mot de passe actuel</label>
        <Input
          id="currentPassword"
          type="password"
          className="myProfile__form__input"
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
          className="myProfile__form__input"
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
          className="myProfile__form__input"
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
          { type: "submit" },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
        )}
      </div>
    </form>
  );
};

const ChangePassword = ({ setIsEditing, data, refresh }) => {
  const { changePassword, isLoading } = useChangePassword();

  // function handlePassword(currentPassword, updatedConfirmedPassword) {
  //   changePassword(currentPassword, updatedConfirmedPassword);
  // }

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
              isLoading={isLoading}
              onSubmit={changePassword}
              refresh={refresh}
              submitButton={<Button variant="primary">{saveButton}</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </>
  );
};

export default ChangePassword;
