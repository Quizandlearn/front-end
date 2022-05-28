import React, { useState } from "react";
import "./MyProfile.css";
import MyProfileImage from "./MyProfileImage";

// const EditEmailField = ({ jsonData }) => (
//   <div className="field">
//     <div className="control">
//       <input className="input is-warning" type="email" value={jsonData.email} />
//     </div>
//   </div>
// );

// const EditContactField = ({ jsonData }) => (
//   <div className="field">
//     <div className="control">
//       <input
//         className="input is-warning"
//         type="text"
//         value={jsonData.contact}
//         placeholder={jsonData.contact ? jsonData.contact : "Empty"}
//       />
//     </div>
//   </div>
// );

// const EditNameField = ({ jsonData, handleEditPerson }) => (
//   <input
//     className="input is-warning"
//     type="text"
//     value={jsonData.name}
//     onEdit={(e) => {
//       handleEditPerson({
//         ...jsonData,
//         name: e.target.value,
//       });
//     }}
//   />
// );

// const UserFirstName = ({ jsonData }) => <div className="field">{jsonData.name}</div>;

// const UserLastName = ({ jsonData }) => <div className="field">{jsonData.name}</div>;

// const UserEmail = ({ jsonData }) => <div className="field">{jsonData.email}</div>;

const MyProfileAboutYou = ({ jsonData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(jsonData.name);
  const [lastName, setLastName] = useState(jsonData.name);
  const [email, setEmail] = useState(jsonData.email);

  return (
    <div className="MyProfile__aboutYouContainer">
      <div htmlFor="title" className="titleInsideContainer">
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
        <div className="MyProfile__editButtonContainer">
          <button className="MyProfile__editButton" type="submit">
            {isEditing ? "Enregistrer" : "Modifier"}
          </button>
          <button className="MyProfile__editButton" type="button">Changer le mot de passe</button>
        </div>
      </form>
    </div>
  );
};

const MyProfile = ({ users }) => {
  const [name] = users;
  const user = name;
  const [jsonData, setJsonData] = useState(user);

  const handleEditPerson = (newPerson) => {
    setJsonData(
      jsonData.map((person) => {
        if (person.name === newPerson.name) {
          return newPerson;
        }
        return person;
      })
    );
  };
  return (
    <div className="profilePageContainer">
      <div className="titleContainer">
        <section id="titleContainer">
          <h1 id="profileTitle">Mon profil</h1>
        </section>
      </div>
      <div className="mainSectionContainer">
        <MyProfileImage />
        <MyProfileAboutYou jsonData={jsonData} handleEditPerson={handleEditPerson} />
      </div>
    </div>
  );
};

export default MyProfile;
