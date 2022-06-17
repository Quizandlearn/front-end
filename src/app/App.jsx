import "bulma/css/bulma.min.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
import RequireAuth from "../context/RequireAuth";
import Navigation from "../components/navigation/Navigation";
import Explore from "../pages/Explore/Explore";
import MyProfile from "../pages/Profile/MyProfile";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Categories from "../pages/Categories/Categories";
import MyQuizzes from "../pages/MyQuizzes/MyQuizzes";
import FavoriteQuizzes from "../pages/FavoriteQuizzes/FavoriteQuizzes";
import CompletedQuizzes from "../pages/CompletedQuizzes/CompletedQuizzes";

const App = () => (
  <AuthProvider>
    <Navigation />
    <Routes>
      {/* public routes */}
      <Route element={<RequireAuth onlyPublic />}>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route path="/quizzes" element={<Explore />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/myQuizzes" element={<MyQuizzes />} />
        <Route path="/favoriteQuizzes" element={<FavoriteQuizzes />} />
        <Route path="/completedQuizzes" element={<CompletedQuizzes />} />
      </Route>

      {/* route qui n'existe pas - redirection page Explore */}
      <Route path="*" element={<Explore />} />
    </Routes>
  </AuthProvider>
);

export default App;
