import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/"; // Replace this with your actual API base URL

const BugTrackingApi = axios.create({
  baseURL: BASE_URL,
});

export default BugTrackingApi;
