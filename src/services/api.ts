import axios from "axios";

const api = axios.create({
  baseURL: "https://hoffens-api.herokuapp.com",
});

export default api;
