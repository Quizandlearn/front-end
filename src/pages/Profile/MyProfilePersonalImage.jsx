import React from "react";
import "./MyProfile.css";
import profile from "../../assets/profile.png";

const MyProfilePersonalImage = () => (
  <figure className="image is-40x40">
    <img className="is-rounded" src={profile} alt="Profile" />
  </figure>
);

export default MyProfilePersonalImage;
