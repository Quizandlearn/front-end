import React from "react";
import "./MyProfile.css";
import picprofil from "../../assets/picprofil.png";

const MyProfileImage = () => (
  <div className="myProfile__image">
    <img className="is-rounded" src={picprofil} alt="Profile" />
  </div>
);

export default MyProfileImage;
