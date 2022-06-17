/* eslint-disable */


import React, { useState } from "react";
import "./MyProfile.css";
import MyProfileImage from "./MyProfileImage";
import MyProfilePersonalData from "./MyProfilePersonalData";
import useGetConnectedUser from "../../hooks/useGetConnectedUser";


const MyProfile = () => {
  const [loading, data] = useGetConnectedUser();

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <>
        {!loading && <div className="myProfile__container">
          <div className="myProfile__titleContainer ">
            <h1 id="myProfile__title">Mon profil</h1>
          </div>
          <div className="myProfile__mainSectionContainer">
            <MyProfileImage data={data}/>
            <MyProfilePersonalData data={data} />
          </div>
        </div>}
    </>
  );
};

export default MyProfile;
