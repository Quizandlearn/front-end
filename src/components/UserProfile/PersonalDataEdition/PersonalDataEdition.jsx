import React, { useState } from "react";
import "../../../pages/MyProfile/MyProfile.css";
import PropTypes from "prop-types";
import useChangeConnectedUser from "../../../hooks/useChangeConnectedUser";

const PersonalDataEdition = ({ data }) => {
  const { name } = data;
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(name);
  const [lastName, setLastName] = useState(data.surname);
  const [myEmail, setEmail] = useState(data.email);
  const { sendChangedUserData } = useChangeConnectedUser();

  const handleFormSubmit = (e) => {
    sendChangedUserData(firstName, lastName, myEmail, e, (message) => {
      console.log(message);
    });
    setIsEditing(!isEditing);
  };

  const saveButton = "Enregistrer";
  const modifyPasswordButton = "Changer le mot de passe";

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="myProfile__form__fields__container">
        <div className="myProfile__form__field field">
          <input
            id="name"
            className="myProfile__form__input"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            required
          />
        </div>
        <div className="myProfile__form__field field">
          <input
            id="surname"
            className="myProfile__form__input"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            required
          />
        </div>
        <div className="myProfile__form__field field">
          <input
            id="email"
            className="myProfile__form__input"
            type="text"
            value={myEmail}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
      </div>
      <div className="myProfile__editButtonContainer">
        <button className="myProfile__editButton" type="submit">
          {saveButton}
        </button>
        <button className="myProfile__editButton" type="button">{modifyPasswordButton}</button>
      </div>
    </form>
  );
};

PersonalDataEdition.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default PersonalDataEdition;
