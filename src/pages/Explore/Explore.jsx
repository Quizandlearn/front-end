import React from "react";
import useAuth from "../../hooks/useAuth";
import "./Explore.css";

const Explore = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  return (
    <div className="explore">
      <div className="explore__container">
        <h2 className="explore__container-title">TOUS LES QUIZ</h2>
        <ul>
          <li>
            <div className="explore__container-list__item">Un quiz : description, auteur, thème...</div>
            <div className="explore__container-list__item">Un quiz : description, auteur, thème...</div>
            <div className="explore__container-list__item">Un quiz : description, auteur, thème...</div>
            <div className="explore__container-list__item">Un quiz : description, auteur, thème...</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Explore;
