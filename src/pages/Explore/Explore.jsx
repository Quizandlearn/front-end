import React from "react";
import { Link } from "react-router-dom";
import profileQuiz from "../../assets/profileQuiz.png";
import useGetQuizzes from "../../hooks/useGetQuizzes";
import Loading from "../../assets/Loading";
import "./Explore.css";

const Explore = () => {
  const { data, loading } = useGetQuizzes();
  const exploreTitle = "Les derniers quiz ajoutés";
  const descriptionQuiz = "En savoir plus";
  const ratingsQuiz = "★★★★☆";

  return (
    <>
      {loading && <Loading />}
      {(!loading && data) && (
        <main className="explore">
          <h2 className="explore__title">{exploreTitle}</h2>
          {data && data.map((quiz) => (
            <div className="explore__list__item" key={quiz._id}>
              <div className="explore__list__item__text">
                <h3 className="explore__list__item__text__title">{quiz.title}</h3>
                <div className="explore__list__item__text__stars">{ratingsQuiz}</div>
                {" "}
                <button className="explore__list__item__text__category" type="button" href="https://quiz-and-learn-heroku-front.herokuapp.com/">{quiz.categories}</button>
                <p title={quiz.description} className="explore__list__item__text__description">{descriptionQuiz}</p>
              </div>
              <div className="explore__list__item__assets">
                <div className="explore__list__item__assets__profile-img">
                  <figure className="image is-64x64">
                    <img
                      src={profileQuiz}
                      alt="Profile"
                    />
                  </figure>
                </div>
                <p className="explore__list__item__assets__username">
                  {quiz.user.name}
                </p>
                <Link className="explore__list__item__assets__button" to={`/quizzes/${quiz._id}`} state={{ from: quiz }}>Faire ce quiz</Link>
              </div>
            </div>
          ))}
        </main>
      )}
    </>
  );
};
export default Explore;
