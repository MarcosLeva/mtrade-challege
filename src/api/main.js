import axios from "axios";

export const BASE_URL = "http://67.205.189.142:8000";
export const API = axios.create({ baseURL: BASE_URL });
