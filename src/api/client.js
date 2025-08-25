import axios from "axios";

export const api = axios.create({
  baseURL: "https://likelion.info:443",
  withCredentials: true,             
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

