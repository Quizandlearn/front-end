import React from "react";
import useAuth from "../../hooks/useAuth";
import "./Explore.css";
import profile from "../../assets/profile.png";

const Explore = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();

  const quizzes = [{
    titleQuiz: "Ceci est un très très très long titre de quiz...",
    category: "CATÉGORIE",
    author: "Lisa",
    mark: "★★★★☆",
  }, {
    titleQuiz: "Ceci est un autre très très long titre de quiz...",
    category: "CATEGORY",
    author: "Antoine",
    mark: "★★★☆☆",
  },
  ];

  const exploreTitle = "Les derniers quiz ajoutés";
  const descriptionQuiz = "En savoir plus";

  return (
    <div className="explore">
      <h2 className="explore__title">{exploreTitle}</h2>
      {quizzes && quizzes.map((quiz) => (
        <div className="explore__list__item" key={quiz.titleQuiz}>
          <div className="explore__list__item__text">
            <h3 className="explore__list__item__text__title">{quiz.titleQuiz}</h3>
            <div className="explore__list__item__text__details">
              <div className="explore__list__item__text__details-category">{quiz.category}</div>
              <div className="explore__list__item__text__details-stars">{quiz.mark}</div>
            </div>
            <div className="explore__list__item__text__description">{descriptionQuiz}</div>
          </div>
          <div className="profile-img">
            <figure className="image is-64x64">
              <img
                src={profile}
                alt="Profile"
              />
            </figure>
            {" "}
            {quiz.author}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;
