/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import picProfileGreen from "../../assets/picProfileGreen.svg";
import logoutPic from "../../assets/logoutPic.svg";
import logoApp from "../../assets/logoApp.svg";
import "./Navigation.css";
import useAuth from "../../hooks/useAuth";

const EXPLORE_URL_FRONTEND = "/quizzes";
const EXPLORE_CATEGORIES_URL_FRONTEND = "/quizzesByCategory";
const CREATEQUIZ_URL_FRONTEND = "/createQuiz";
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

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(MYPROFILE_URL_FRONTEND);
  };

  // const welcomeName = "Hello";

  if (user) {
    return (
      <div className={showLinks ? "navigation show-navigation" : "navigation"}>
        <div className="navigation__profile__container">
          <div className="navigation__logout-and-profile">
            <div className="profile">
              <figure className="image is-32x32">
                <img
                  className="is-rounded"
                  src={picProfileGreen}
                  alt="Profile"
                  onClick={handleProfileClick}
                />
              </figure>
              {/* <Link
                className="menu-link"
                to={MYPROFILE_URL_FRONTEND}
                onClick={handleClickLink}
              >
                {welcomeName}
              </Link> */}
            </div>
            <figure className="image is-32x32">
              <img
                className="is-rounded"
                src={logoutPic}
                alt="logoutPic"
                onClick={logout}
              />
            </figure>
          </div>
        </div>
        <div className="navigation__logo__container">
          <img src={logoApp} className="navigation__logo" alt="" />
        </div>
        <div className="navigation__search__container">
          {/* Search bar Bulma */}
          <div className="searchBar">
            <input className="input navigation__searchbar-input" type="text" placeholder="Rechercher ..." />
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
              to={EXPLORE_CATEGORIES_URL_FRONTEND}
              onClick={handleClickLink}
            >
              Catégories
            </Link>
            <Link
              className="menu-link"
              to={CREATEQUIZ_URL_FRONTEND}
              onClick={handleClickLink}
            >
              Créer un quiz
            </Link>
            {/* A faire */}
            <Link
              className="menu-link"
              to={MYQUIZZES_URL_FRONTEND}
              onClick={handleClickLink}
            >
              Mes quiz
            </Link>
            <Link
              className="menu-link"
              to={FAVORITEQUIZZES_URL_FRONTEND}
              onClick={handleClickLink}
            >
              Quiz favoris
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
        <button type="button" className="navbar-burger" onClick={handleShowLinks}>
          <span className="burger-bar" />
        </button>
      </div>
    );
  }
  return null;
};

export default Navigation;
