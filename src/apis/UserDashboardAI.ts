import axios from "axios";

const BASE_URL_USER = "http://localhost:8081/";

const dashboardAI = axios.create({
  baseURL: BASE_URL_USER,
});

export default dashboardAI;