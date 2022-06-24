import React from "react";
import useAuth from "../../hooks/useAuth";
import "./Explore.css";

const Explore = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();
  return (
    <div className="explore">
      <h2 className="explore__title">Les derniers quiz ajoutés</h2>
      <ul>
        <li>
          <div className="explore__list__item">
            <h3 className="explore__list__item-title">Ceci est un très long long titre de quiz...</h3>
            <div className="explore__list__item__details">
              <div className="explore__list__item__details-category">#Catégorie</div>
              <div className="explore__list__item__details-stars">★★★★☆</div>
            </div>
            <div className="explore__list__item-description">En savoir plus</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Explore;
