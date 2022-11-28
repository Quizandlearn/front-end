/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from "@emotion/react";
import "bootstrap/dist/css/bootstrap-reboot.css";

import { useState } from "react";
import PropTypes from "prop-types";
import "@reach/dialog/styles.css";
import "../../../pages/MyProfile/MyProfile.css";
import MyProfilePersonalImage from "../MyProfilePersonalImage/MyProfilePersonalImage";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import ChangePersonalData from "../ChangePersonalData/ChangePersonalData";
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-one-expression-per-line */

const MyProfilePersonalData = ({ data, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);

  const personalDataTitle = "A propos de moi";

  return (
    <div className="myProfile__form">
      <div className="myProfile__form__photo__profile">
        <MyProfilePersonalImage />
      </div>
      <div className="myProfile__form__personal__data">
        <div htmlFor="title" className="myProfile__form__title">
          {personalDataTitle}
        </div>
        {isEditing && (
          <ChangePersonalData
            data={data}
            refresh={refresh}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        )}
        {!isEditing && (
          <ChangePasswordForm setIsEditing={setIsEditing} data={data} />
        )}
      </div>
    </div>
  );
};

MyProfilePersonalData.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
};

export default MyProfilePersonalData;
