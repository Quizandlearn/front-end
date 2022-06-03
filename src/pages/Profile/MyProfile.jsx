import React, { useState } from "react";
import "./MyProfile.css";
import MyProfileImage from "./MyProfileImage";
import MyProfilePersonalData from "./MyProfilePersonalData";

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
    <div className="myProfile__container">
      <div className="myProfile__titleContainer ">
        <h1 id="myProfile__title">Mon profil</h1>
      </div>
      <div className="myProfile__mainSectionContainer">
        <MyProfileImage />
        <MyProfilePersonalData jsonData={jsonData} handleEditPerson={handleEditPerson} />
      </div>
    </div>
  );
};

export default MyProfile;
