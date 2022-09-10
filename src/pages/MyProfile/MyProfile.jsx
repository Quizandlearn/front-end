import React from "react";
import "./MyProfile.css";
import MyProfileImage from "../../components/UserProfile/MyProfileImage/MyProfileImage";
import MyProfilePersonalData from "../../components/UserProfile/MyProfilePersonalData/MyProfilePersonalData";
import useGetConnectedUser from "../../hooks/useGetConnectedUser";
/* eslint-disable react/jsx-no-useless-fragment */

const MyProfile = () => {
  const [loading, data, refresh] = useGetConnectedUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  const myProfile = "Mon Compte";

  return (
    <>
      {!loading && (
      <div className="myProfile">
        <div className="myProfile__title__container">
          <h1 id="myProfile__title">{myProfile}</h1>
        </div>
        <div className="myProfile__main__section">
          <MyProfileImage />
          <MyProfilePersonalData data={data} refresh={refresh} />
        </div>
      </div>
      )}
    </>
  );
};

export default MyProfile;
