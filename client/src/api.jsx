import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? window.location.origin     // deployed domain
  : "http://localhost:5000";   // local dev

const api = axios.create({
  baseURL: BASE_URL + "/api",
  headers: { "Content-Type": "application/json" },
});

export default api;
