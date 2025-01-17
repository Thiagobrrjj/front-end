import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
