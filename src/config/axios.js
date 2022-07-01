import axios from "axios";

export default axios.create({
  /* Ici même URL où tourne le back */
  baseURL: "http://localhost:4000/api/",
});
