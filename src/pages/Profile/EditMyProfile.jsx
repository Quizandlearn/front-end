import React from "react";
import "./myProfile.css";
import profile from "./profile.png";

const MyProfile = () => (
  <div className="profilePageContainer">
    <section id="titleContainer">
      <h1 id="profileTitle">My profile</h1>
    </section>
    <div className="mainSectionContainer">
      <div className="photoProfileContainer">
        <figure className="image is-128x128">
          <img className="is-rounded" src={profile} alt="Profile" />
        </figure>
        <label htmlFor="title" className="titleInsideContainer">
          First name
        </label>
        <label htmlFor="title" className="sr-only">
          Edit
        </label>
      </div>
      <div className="personalInformationContainer">
        <label htmlFor="title" className="titleInsideContainer">
          Personal information
        </label>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input is-warning"
              type="email"
              placeholder="name from DB"
            />
          </div>
          <h1>Change name</h1>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input is-warning"
              type="text"
              placeholder="email from DB"
            />
          </div>
          <h2>Change email</h2>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input is-warning"
              type="password"
              placeholder="********"
            />
          </div>
          <h2>Change password</h2>
        </div>

        <div className="field">
          <label className="label">Contact</label>
          <div className="control">
            <input className="input is-danger" type="tel" placeholder="" />
          </div>
          <h2>Add contact</h2>
        </div>

        <div className="field">
          <label className="label">Delete Account</label>
        </div>
      </div>
      <div className="buttonContainer">
        <button className="saveChangesButton">Save changes</button>
      </div>
    </div>
    <section id="titleQuizzesContainer">
      <h2 id="quizzesTitle">My quizzes</h2>
    </section>
    <div className="mainSectionContainer">
      <div className="photoProfileContainer">
        <h6>ICI ON VA AVOIR LE COMPOSANT 'MY QUIZZES'</h6>
      </div>
    </div>
  </div>
);

export default MyProfile;
