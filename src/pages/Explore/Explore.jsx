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
    titleQuiz: "Ceci est un autre très très très très long titre de quiz...",
    category: "SCIENCES",
    author: "Antoine",
    mark: "★★★☆☆",
  },
  {
    titleQuiz: "Ceci est un petit titre",
    category: "TITRE",
    author: "Léo",
    mark: "★★★☆☆",
  },
  {
    titleQuiz: "Ceci est un moyen titre de quiz",
    category: "JAVASCRIPT",
    author: "Jean-Maximilien",
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
            <div className="explore__list__item__text__stars">{quiz.mark}</div>
            {" "}
            <div className="explore__list__item__text__category">{quiz.category}</div>
            <div className="explore__list__item__text__description">{descriptionQuiz}</div>
          </div>

          <div className="explore__list__item__assets">
            <div className="explore__list__item__assets__profile-img">
              <figure className="image is-64x64">
                <img
                  src={profile}
                  alt="Profile"
                />
              </figure>
              {" "}
              {quiz.author}
            </div>
            <button className="explore__list__item__assets__button" type="submit">Faire ce quiz</button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Explore;
