import React from "react";
import "./MyProfile.css";
import profile from "./profile.png";
import useAuth from "../../hooks/useAuth";

const MyProfileImage = () => {
  const { logout, user } = useAuth();

  return (
    <div className="photoProfileContainer">
      <figure className="image is-128x128">
        <img className="is-rounded" src={profile} alt="Profile" />
      </figure>
      <label htmlFor="title" className="titleInsideContainer">
        {user.userId}
      </label>
      <button className="MyProfile__logOutButton" type="button" onClick={logout}>
        Déconnexion
      </button>
    </div>
  );
};

export default MyProfileImage;
