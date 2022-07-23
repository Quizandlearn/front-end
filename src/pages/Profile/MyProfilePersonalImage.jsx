import React from "react";
import "./MyProfile.css";
import profile from "../../assets/profile.png";

const MyProfilePersonalImage = () => (
  <figure className="image is-64x64">
    <img className="is-rounded" src={profile} alt="Profile" />
  </figure>
);

export default MyProfilePersonalImage;
