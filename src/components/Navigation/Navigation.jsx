/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useNavigate } from "react-router-dom";
import picProfileGreen from "../../assets/picProfileGreen.svg";
import logoutPic from "../../assets/logoutPic.svg";
import logoApp from "../../assets/logoApp.svg";
import "./Navigation.css";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
  const { logout, user } = useAuth();

  const MYPROFILE_URL_FRONTEND = "/myProfile";

  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(MYPROFILE_URL_FRONTEND);
  };

  if (user) {
    return (
      <header className="navigation">
        <div className="navigation__profile__container">
          <div className="navigation__logout-and-profile">
            <div className="profile">
              <button type="button" className="editButton navigation__button" onClick={handleImageClick}>
                <img
                  className="navigation__profile__pic"
                  src={picProfileGreen}
                  alt="page mon profil"
                />
              </button>
            </div>
            <button type="button" className="editButton navigation__button" onClick={logout}>
              <img
                className="navigation__logout__pic"
                src={logoutPic}
                alt="logout"
              />
            </button>

          </div>
        </div>
        <div className="navigation__logo__container">
          <img src={logoApp} className="navigation__logo" alt="" />
        </div>
        <div className="navigation__search__container">
          {/* Search bar Bulma */}
          <form className="searchBar" role="search">
            <input type="search" className="input navigation__searchbar-input" placeholder="Rechercher ..." />
          </form>
        </div>
        <nav className="navigation__menu">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1" />
            <span className="line line2" />
            <span className="line line3" />
          </div>
          <ul className="menu-items">
            <li><a href="/quizzes">Explorer</a></li>
            <li><a href="/quizzesByCategory">Catégories</a></li>
            <li><a href="/createQuiz">Créer un quiz</a></li>
            <li><a href="/myQuizzes">Mes quiz</a></li>
            <li><a href="/favoriteQuizzes">Quiz favoris</a></li>
            <li><a href="/completedQuizzes">Quiz répondus</a></li>
          </ul>
        </nav>
      </header>
    );
  }

  return null;
};

export default Navigation;
