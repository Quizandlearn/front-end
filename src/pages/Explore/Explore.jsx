import React from "react";
import profile from "../../assets/profile.png";
import useGetQuizzes from "../../hooks/useGetQuizzes";
import "./Explore.css";
/* eslint-disable no-underscore-dangle */

const Explore = () => {
  const { data, loading } = useGetQuizzes();
  const exploreTitle = "Les derniers quiz ajoutés";
  const descriptionQuiz = "En savoir plus";
  const ratingsQuiz = "★★★☆☆";
  return (
    <>
      {loading && <div>Loading</div>}
      {(!loading && data) && (
        <div className="explore">
          <h2 className="explore__title">{exploreTitle}</h2>
          {data.quizzes && data.quizzes.map((quiz) => (
            <div className="explore__list__item" key={quiz._id}>
              <div className="explore__list__item__text">
                <h3 className="explore__list__item__text__title">{quiz.title}</h3>
                <div className="explore__list__item__text__stars">{ratingsQuiz}</div>
                {" "}
                <button className="explore__list__item__text__category" type="button" href="https://quiz-and-learn-heroku-front.herokuapp.com/">{quiz.categories}</button>
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
                </div>
                <div className="explore__list__item__assets__username">
                  {quiz.id_user_owner}
                </div>
                <button className="explore__list__item__assets__button" type="submit">Faire ce quiz</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Explore;

/*

  // const quizzes = [{
  //   title: "Ceci est un très très très long titre de quiz...",
  //   categories: "CATÉGORIE",
  //   id_user_owner: "Lisa",
  //   ratings: "★★★★☆",
  // }, {
  //   title: "Ceci est un autre très très très très long titre de quiz...",
  //   categories: "SCIENCES",
  //   id_user_owner: "Antoine",
  //   ratings: "★★★☆☆",
  // },
  // {
  //   title: "Ceci est un petit titre",
  //   categories: "TITRE",
  //   id_user_owner: "Léo",
  //   ratings: "★★★☆☆",
  // },
  // {
  //   title: "Ceci est un moyen titre de quiz",
  //   categories: "JAVASCRIPT",
  //   id_user_owner: "Jean-Maximilien",
  //   ratings: "★★★☆☆",
  // },
  // ];

    {loading && data && (
      <>
          <div className="explore__list__item" key={quiz.title}>
*/
