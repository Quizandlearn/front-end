import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import api from "../config/api";
import { actions, useStateValue } from "../context/AuthProvider";
import errorDisplayed from "../config/error";

const EXPLORE_URL_FRONTEND = "/quizzes";

const useAuth = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const login = async (values, onError) => {
    try {
      // 1--ATTENTE REPONSE DU SERVER
      // la fonction axios.post se trouve dans le dossier hooks
      const response = await axios.post(
        api.login,
        JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      /* voir réponse du serveur : console.log(JSON.stringify(response.data)); */
      console.log("response", response);

      // 2--STOCKAGE DANS LOCAL STORAGE de l'USER (l'id + token) - pour securité: bien de ne pas stocker mdp
      const accessToken = response.data.token;
      const { userId } = response.data;

      const userData = {
        userId,
        token: accessToken,
      };

      // locale storage n'accepte uniquement les chaînes de charactère (JSON.str convertit objet en chaîne)
      localStorage.setItem("user", JSON.stringify(userData));

      // ajouter prénom de l'utilisateur dans le contexte

      // 3--MISE A JOUR DU CONTEXTE GLOBAL DE L'APPLICATION
      // on passe l'Auth Provider = on met à jour instantanéement tous les composants de l'application
      // en leur passant les données de l'user(son email et son token)
      dispatch({
        payload: actions.HANDLE_USER,
        // data correspond à action.data
        data: userData,
      });

      // 4--NAVIGATION en FRONT vers la PAGE EXPLORE
      navigate(EXPLORE_URL_FRONTEND);
    } catch (error) {
      // on test que le 2e paramètre soit une fonction (on s'assure qu'il y ait un 2e argument et qu'il soit une fonction)
      if (typeof onError === "function") {
        if (!error.response) {
          onError(errorDisplayed.server);
        } else if (error.response.status === 401) {
          onError(errorDisplayed.invalidCredentials);
        }
      }
    }
  };

  const logout = () => {
    // Je supprime le local storage avec la clé user
    localStorage.clear("user");

    // ici je reinitialise l'état global de l'application à null (donc on enlève l'utilisateur de data)
    dispatch({
      payload: actions.HANDLE_USER,
      data: null,
    });
    navigate("/");
  };

  return {
    user,
    login,
    logout,
  };
};

export default useAuth;
