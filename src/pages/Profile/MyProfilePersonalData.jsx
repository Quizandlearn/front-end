import React, { useState } from "react";
import "./MyProfile.css";

const MyProfilePersonalData = ({ jsonData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(jsonData.name);
  const [lastName, setLastName] = useState(jsonData.name);
  const [email, setEmail] = useState(jsonData.email);

  // console.log(jsonData);
  return (
    <div className="myProfile__personalDataContainer">
      <div htmlFor="title" className="myProfile__titleInsideContainer">
        À propos de moi
      </div>
      <div className="field">
        <div className="label">Prénom</div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
      }}
      >
        {isEditing ? (
          <input
            className="input is-warning"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        ) : (
          <div className="field">{jsonData.name}</div>
        )}
        <div className="field">
          <div className="label">Nom</div>
          {isEditing ? (
            <input
              className="input is-warning"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          ) : (
            <div className="field">{jsonData.name}</div>
          )}
        </div>
        <div className="field">
          <div className="label">Email</div>
          {isEditing ? (
            <input
              className="input is-warning"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          ) : (
            <div className="field">{jsonData.email}</div>
          )}
        </div>
        <div className="myProfile__editButtonContainer">
          <button className="myProfile__editButton" type="submit">
            {isEditing ? "Enregistrer" : "Modifier"}
          </button>
          <button className="myProfile__editButton" type="button">Changer le mot de passe</button>
        </div>
      </form>
    </div>
  );
};

export default MyProfilePersonalData;
