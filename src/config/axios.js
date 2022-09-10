import axios from "axios";

export default axios.create({
  /* Ici même URL où tourne le back */
  baseURL: `${process.env.REACT_APP_API_URL}/api/`
});
