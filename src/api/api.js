import axios from "axios";
const local = "http://localhost:8080";
const pro = "https://robobitst-backend.onrender.com";

let api_url = "";
let mode = "pro";
if (mode === "pro") {
  api_url = pro;
} else {
  api_url = local;
}
const api = axios.create({
  baseURL: `${api_url}/api`,
});

export default api;
