import io from "socket.io-client";
export const overRideCss = {
  display: "flex",
  margin: "0 auto",
  height: "25px",
  justifyContent: "center",
  alignItems: "center",
};

export const socket = io("http://localhost:8080");
