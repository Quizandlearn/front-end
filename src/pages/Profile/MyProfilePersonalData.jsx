/* eslint-disable */
import React, { useState } from "react";
import "./MyProfile.css";
import useChangeConnectedUser from "../../hooks/useChangeConnectedUser";

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

  return (
    <div className="myProfile__personalDataContainer">
      <div htmlFor="title" className="myProfile__titleInsideContainer">
        À propos de moi
      </div>
      {isEditing && (
        <form onSubmit={handleFormSubmit}>
          <div className="field">
            <label htmlFor="name" className="label">Nom</label>
            <input
              id="name"
              className="input is-warning"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="surname" className="label">Prénom</label>
            <input
              id="surname"
              className="input is-warning"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              className="input is-warning"
              type="text"
              value={myEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="myProfile__editButtonContainer">
            <button className="myProfile__editButton" type="submit">
              Enregistrer
            </button>
            <button className="myProfile__editButton" type="button">Changer le mot de passe</button>
          </div>
        </form>
      )}
      {!isEditing && (
        <>
          <div className="field">
            <label className="label">Nom</label>
            <p className="myProfile__textSmall">{data.name}</p>
          </div>
          <div className="field">
            <label className="label">Prénom</label>
            <p className="myProfile__textSmall">{data.surname}</p>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <p className="myProfile__textSmall">{data.email}</p>
          </div>
          <div className="myProfile__editButtonContainer">
            <button
              className="myProfile__editButton"
              type="button"
              onClick={(e) => {
                setIsEditing(true);
              }}
            >
              Modifier
            </button>
            <button className="myProfile__editButton" type="button">Changer le mot de passe</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProfilePersonalData;
