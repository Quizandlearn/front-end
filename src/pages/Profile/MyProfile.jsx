/* eslint-disable */

import React from "react";
import "./MyProfile.css";
import MyProfileImage from "./MyProfileImage";
import MyProfilePersonalData from "./MyProfilePersonalData";
import useGetConnectedUser from "../../hooks/useGetConnectedUser";

const MyProfile = () => {
  const [loading, data] = useGetConnectedUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  const myProfile = "Mon Profil";

  return (
    <>
      {!loading && (
      <div className="myProfile">
        <div className="myProfile__title__container">
          <h1 id="myProfile__title">{myProfile}</h1>
        </div>
        <div className="myProfile__main__section">
          <MyProfileImage/>
          <MyProfilePersonalData data={data} />
        </div>
      </div>
      )}
    </>
  );
};

export default MyProfile;
