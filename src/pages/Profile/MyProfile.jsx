import React from "react";
import "./MyProfile.css";
import profile from "./profile.png";
import useAuth from "../../hooks/useAuth";
/* eslint-disable jsx-a11y/label-has-associated-control */

const EditButtons = () => <button type="button" className="editButton">Edit</button>;

const MyProfileAboutYou = () => (
  <div className="personalInformationContainer">
    <label htmlFor="title" className="titleInsideContainer">
      About You
    </label>
    <div className="field">
      <label className="label">Name</label>
      <p>My Name</p>
    </div>

    <div className="field">
      <label className="label">Email</label>
      <p>My Email</p>
    </div>

    <div className="field">
      <label className="label">Contact</label>
      <p>My Contact</p>
    </div>
    <EditButtons />
  </div>
);

const MyProfileImage = () => {
  const { logout } = useAuth();
  return (
    <div className="photoProfileContainer">
      <figure className="image is-128x128">
        <img className="is-rounded" src={profile} alt="Profile" />
      </figure>
      <label htmlFor="title" className="titleInsideContainer">
        First name
      </label>
      <button type="button" className="editButton" onClick={logout}>
        Log Out
      </button>
    </div>
  );
};

const MyProfileInformation = () => (
  <div className="mainSectionContainer">
    <MyProfileImage />
    <MyProfileAboutYou />
  </div>
);

const MyProfileTitle = () => (
  <div className="titleContainer">
    <section id="titleContainer">
      <h1 id="profileTitle">My profile</h1>
    </section>
  </div>
);

const MyProfile = () => (
  <div className="profilePageContainer">
    <MyProfileTitle />
    <MyProfileInformation />
  </div>
);

export default MyProfile;
