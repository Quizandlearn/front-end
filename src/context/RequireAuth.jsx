/* eslint-disable */
import { useLocation, Navigate, Outlet } from "react-router-dom";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";

// dans ce composant on veut faire 2 choses :
// 1-- vérifier que le token de l'utilisateur est valide, s'il n'est plus valide => le renvoyer vers le page de LOGIN
// 2---faire en sorte que les routes login et connexion ne soient plus accessible lorsque que l'utilisateur est connecté

const RequireAuth = ({ onlyPublic }) => {
  const location = useLocation();
  const { user } = useAuth();

  const isValidToken = (token) => {
    // eslint-disable-next-line no-param-reassign
    token = jwt_decode(token);
    // Cet instant présent en millisecondes
    const now = Math.floor(Date.now() / 1000);

    if (token) {
      // si l'expiration du token est supérieure à maintenant
      if (token.exp > now) {
        return true;
      }
    }

    return false;
  };

  const userIsLogged = () => {
    // si l'utilisateur est connecté
    if (user) {
      // si l'utilisateur est connecté et qu'il a un token valide
      if (isValidToken(user.token)) {
        return true;
      }
    }
    return false;
  };

  // Si la route est accessible uniquement lorsque l'utilisateur n'est pas connecté
  if (onlyPublic) {
    // Si l'utilisateur n'est pas connecté on affiche la route
    if (!userIsLogged()) {
      return <Outlet />;
    }
    // sinon on redirige vers la page "d'accueil"
    return <Navigate to="/quizzes" state={{ from: location }} replace />;
  }

  return userIsLogged() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
