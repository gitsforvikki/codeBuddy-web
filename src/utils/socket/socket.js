// import io from "socket.io-client";
// // const base_url = import.meta.env.VITE_API_BASE_URL;

// export const createSocketConnection = () => {
//   return io("http://localhost:3000");
// };

import { io } from "socket.io-client";

export const createSocketConnection = () => {
  return io("http://localhost:3000", {
    transports: ["websocket"],
    withCredentials: true,
  });
};
