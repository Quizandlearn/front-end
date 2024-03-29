import React from "react";
import useGetMyQuizzes from "../../hooks/useGetMyQuizzes";
import Loading from "../../assets/Loading";
import "../Explore/Explore.css";
import "./MyQuizzes.css";

const MyQuizzes = () => {
  const { data, loading } = useGetMyQuizzes();
  const exploreTitle = "Mes quiz";
  const descriptionQuiz = "En savoir plus";
  const ratingsQuiz = "★★★★☆";
  const noQuizzes = "...";

  return (
    <>
      {loading && <Loading />}
      {!loading && data && (
        <main className="explore">
          <h2 className="explore__title">{exploreTitle}</h2>
          {data &&
            data.map((quiz) => (
              <div className="explore__list__item" key={quiz._id}>
                <div className="explore__list__item__text">
                  <h3 className="explore__list__item__text__title">
                    {quiz.title}
                  </h3>
                  <div className="explore__list__item__text__stars">
                    {ratingsQuiz}
                  </div>
                  {" "}
                  <button
                    className="explore__list__item__text__category"
                    type="button"
                    href="https://quiz-and-learn-heroku-front.herokuapp.com/"
                  >
                    {quiz.categories}
                  </button>
                  <p
                    title={quiz.description}
                    className="explore__list__item__text__description"
                  >
                    {descriptionQuiz}
                  </p>
                </div>
              </div>
            ))}
            {!loading && (<div className="myQuizzes__noQuizzes">{noQuizzes}</div>)}
        </main>
      )}

    </>
  );
};
export default MyQuizzes;
