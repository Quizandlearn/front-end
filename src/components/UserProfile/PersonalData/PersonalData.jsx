import React, { useState } from "react";
import "../../../pages/MyProfile/MyProfile.css";
import useChangeConnectedUser from "../../../hooks/useChangeConnectedUser";

const PersonalData = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);

  const myName = "Nom";
  const mySurname = "Prénom";
  const myEmail = "Email";
  const modifyButton = "Modifier";
  const modifyPasswordButton = "Changer le mot de passe";

  return (
    <>
      <div className="myProfile__form__fields__container">
        <div className="myProfile__form__field field">
          <label className="myProfile__form__label label">{myName}</label>
          <p className="myProfile__form__text">{data.name}</p>
        </div>
        <div className="myProfile__form__field field">
          <label className="myProfile__form__label label">{mySurname}</label>
          <p className="myProfile__form__text">{data.surname}</p>
        </div>
        <div className="myProfile__form__field field">
          <label className="myProfile__form__label label">{myEmail}</label>
          <p className="myProfile__form__text">{data.email}</p>
        </div>
      </div>
      <div className="myProfile__editButtonContainer">
        <button
          className="myProfile__editButton"
          type="button"
          onClick={(e) => {
            setIsEditing(true);
          }}
        >
          {modifyButton}
        </button>
        <button className="myProfile__editButton" type="button">{modifyPasswordButton}</button>
      </div>
    </>
  );
};

export default PersonalData;
