import React from "react";
import "./MyProfile.css";
import MyProfileImage from "../../components/UserProfile/MyProfileImage/MyProfileImage";
import useGetConnectedUser from "../../hooks/useGetConnectedUser";
import Loading from "../../assets/Loading";
import MyProfilePersonalData from "../../components/UserProfile/MyProfilePersonalData/MyProfilePersonalData";
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-tag-spacing */

const MyProfile = () => {
  const [loading, data, refresh] = useGetConnectedUser();

  if (loading) {
    return <Loading/>;
  }

  const myProfile = "Mon Compte";

  return (
    <>
      {!loading && (
      <main className="myProfile">
        <div className="myProfile__title__container">
          <h1 id="myProfile__title">{myProfile}</h1>
        </div>
        <div className="myProfile__main__section">
          <MyProfileImage />
          <MyProfilePersonalData data={data} refresh={refresh} />
        </div>
      </main>
      )}
    </>
  );
};

export default MyProfile;
