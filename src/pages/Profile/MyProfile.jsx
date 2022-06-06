/* eslint-disable */


import React, { useState } from "react";
import "./MyProfile.css";
import MyProfileImage from "./MyProfileImage";
import MyProfilePersonalData from "./MyProfilePersonalData";
import useGetConnectedUser from "../../hooks/useGetConnectedUser";

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
  const [isLoading, data] = useGetConnectedUser();

  const [name] = users;
  const user = name;
  console.log("---user---", user, "---data---", data)

  const [jsonData, setJsonData] = useState();

  const handleEditPerson = (newPerson) => {
    setJsonData(() => {
      if (user.name === newPerson.name) {
        return newPerson;
      }
      return user;
    })
  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }


  // const handleEditPerson = (newPerson) => {
  //   setJsonData(
  //     jsonData.map((person) => {
  //       if (person.name === newPerson.name) {
  //         return newPerson;
  //       }
  //       return person;
  //     })
  //   );
  // };

  return (
      <div classname="App">
        <div className="myProfile__container">
          <div className="myProfile__titleContainer ">
            <h1 id="myProfile__title">Mon profil</h1>
          </div>
          <div className="myProfile__mainSectionContainer">
            <MyProfileImage />
            <MyProfilePersonalData jsonData={data} handleEditPerson={handleEditPerson} />
          </div>
        </div>
      </div>
  );
};

export default MyProfile;
