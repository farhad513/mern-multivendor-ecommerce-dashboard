const local = "http://localhost:8080";
const pro = "https://robobitst-backend.onrender.com";

let base_url = "";
let mode = "pro";
if (mode === "pro") {
  base_url = pro;
} else {
  base_url = local;
}

export { base_url };
