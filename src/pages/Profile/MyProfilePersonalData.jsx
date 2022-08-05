/* eslint-disable */
import React, { useState } from "react";
import "./MyProfile.css";
import useChangeConnectedUser from "../../hooks/useChangeConnectedUser";
import MyProfilePersonalImage from "./MyProfilePersonalImage";


const MyProfilePersonalData = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(data.name);
  const [lastName, setLastName] = useState(data.surname);
  const [myEmail, setEmail] = useState(data.email);
  const { sendChangedUserData } = useChangeConnectedUser();

  const handleFormSubmit = (e) => {
    sendChangedUserData(firstName, lastName, myEmail, e, (message) => {
      console.log(message);
    });
    setIsEditing(!isEditing);
  };

  const personalDataTitle = "A propos de moi";
  const name = "Nom";
  const surname = "Prénom";
  const email = "Email";
  const modifyButton = "Modifier";
  const modifyPasswordButton = "Changer le mot de passe";
  const saveButton = "Enregistrer";


  return (
    <div className="myProfile__form">
      <div className="myProfile__form__photo__profile">
        <MyProfilePersonalImage/>
      </div>
      <div className="myProfile__form__personal__data">
        <div htmlFor="title" className="myProfile__form__title">
          {personalDataTitle}
        </div>
        {isEditing && (
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
        )}
        {!isEditing && (
          <>
            <div className="myProfile__form__fields__container">
              <div className="myProfile__form__field field">
                <label className="myProfile__form__label label">{name}</label>
                <p className="myProfile__form__text">{data.name}</p>
              </div>
              <div className="myProfile__form__field field">
                <label className="myProfile__form__label label">{surname}</label>
                <p className="myProfile__form__text">{data.surname}</p>
              </div>
              <div className="myProfile__form__field field">
                <label className="myProfile__form__label label">{email}</label>
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
        )}
      </div>
    </div>
  )
};

export default MyProfilePersonalData;
