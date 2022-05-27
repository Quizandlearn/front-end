import React, { useState } from "react";
import LogoBlue from "../../assets/logoBlue.png";
import profile from "../../assets/profile.png";
import "./Navigation.css";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EXPLORE_URL_FRONTEND = "/quizzes";
const CATEGORIES_URL_FRONTEND = "/categories";
const MYQUIZZES_URL_FRONTEND = "/myQuizzes";
const FAVORITEQUIZZES_URL_FRONTEND = "/favoriteQuizzes";
const COMPLETEDQUIZZES_URL_FRONTEND = "/completedQuizzes";
const MYPROFILE_URL_FRONTEND = "/myProfile";

const Navigation = () => {
  const { logout, user } = useAuth();

  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleClickLink = () => {
    setShowLinks(false);
  };

  let navigate = useNavigate();

  const handleImageClick = () => {
    navigate(MYPROFILE_URL_FRONTEND);
  };

  if (user) {
    return (
      <div className={showLinks ? "navigation show-navigation" : "navigation"}>
        <div className="upperPartNavigationContainer">
          <img src={LogoBlue} className="logoNavigation" alt="" />
          {/*Search bar Bulma*/}
          <div className="searchBar">
            <input className="input" type="text" placeholder="Rechercher" />
          </div>
          <div className="logoutAndProfile">
            <button className="button-navigation" onClick={logout}>
              Déconnexion{" "}
            </button>
            <div className="profile">
              <figure className="image is-64x64">
                <img
                  className="is-rounded"
                  src={profile}
                  alt="Profile"
                  onClick={handleImageClick}
                />
              </figure>
              <Link
                className="menu-link"
                to={MYPROFILE_URL_FRONTEND}
                onClick={handleClickLink}
              >
                Prénom
              </Link>
            </div>
          </div>
        </div>
        <div className={showLinks ? "menu show-menu" : "menu "}>
          <div className="menu-items">
            <Link
              className="menu-link"
              to={EXPLORE_URL_FRONTEND}
              onClick={handleClickLink}
            >
              Explorer
            </Link>
            <Link
              className="menu-link"
              to={CATEGORIES_URL_FRONTEND}
              onClick={handleClickLink}
            >
              Catégories
            </Link>
            <Link className="menu-link" to="" onClick={handleClickLink}>
              Création Quiz
            </Link>
            {/* A faire */}
            <Link
              className="menu-link"
              to={MYQUIZZES_URL_FRONTEND}
              onClick={handleClickLink}
            >
              Mes Quiz
            </Link>
            <Link
              className="menu-link"
              to={FAVORITEQUIZZES_URL_FRONTEND}
              onClick={handleClickLink}
            >
              Quiz Favoris
            </Link>
            <Link
              className="menu-link"
              to={COMPLETEDQUIZZES_URL_FRONTEND}
              onClick={handleClickLink}
            >
              Quiz répondus
            </Link>
          </div>
        </div>
        <button className="navbar-burger" onClick={handleShowLinks}>
          <span className="burger-bar"></span>
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default Navigation;
