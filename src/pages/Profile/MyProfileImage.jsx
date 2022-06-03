import React from "react";
import "./MyProfile.css";
import profile from "./profile.png";
import useAuth from "../../hooks/useAuth";

const MyProfileImage = () => {
  const { logout, user } = useAuth();

  return (
    <div className="myProfile__photoProfileContainer">
      <figure className="image is-128x128">
        <img className="is-rounded" src={profile} alt="Profile" />
      </figure>
      <label htmlFor="title" className="myProfile__titleInsideContainer">
        {user.userId}
      </label>
      <button className="myProfile__logOutButton" type="button" onClick={logout}>
        Déconnexion
      </button>
    </div>
  );
};

export default MyProfileImage;
