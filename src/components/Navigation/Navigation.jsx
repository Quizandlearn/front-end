/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import picProfileGreen from "../../assets/picProfileGreen.svg";
import logoutPic from "../../assets/logoutPic.svg";
import logoApp from "../../assets/logoApp.svg";
import "./Navigation.css";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
  const { logout, user } = useAuth();

  if (user) {
    return (
      <div className="navigation">
        <div className="navigation__profile__container">
          <div className="navigation__logout-and-profile">
            <div className="profile">
              <a href="/myProfile">
                <img
                  className="navigation__profile__pic"
                  src={picProfileGreen}
                  alt="Profile"
                />
              </a>
            </div>
            <a href={logout}>
              <img
                className="navigation__logout__pic"
                src={logoutPic}
                alt="logoutPic"
              />
            </a>
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
      </div>
    );
  }
  return null;
};

export default Navigation;
