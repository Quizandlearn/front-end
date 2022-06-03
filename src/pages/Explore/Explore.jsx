import React from "react";
import useAuth from "../../hooks/useAuth";
import "./Explore.css";

const Explore = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  return (
    <div className="explore">
      <div className="explore__container-list">
        <div className="explore__container-list-title">TOUS LES QUIZ</div>
        <ul>
          <li>
            <div className="explore__container-list-items">Un quiz</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Explore;
