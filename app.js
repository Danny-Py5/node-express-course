// const http = require("http");
// const { Server } = require("socket.io");

// const httpServer = http.createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://127.0.0.1:5500",
//   },
// });

// function getRandomMsg() {
//   const msgs = [
//     "How are you?",
//     "Hello there!",
//     "What's up?",
//     "Good to see you!",
//     "Have a great day!",
//   ];
//   return msgs[Math.floor(Math.random() * msgs.length)];
// }

// let room = "";

// io.on("connection", (socket) => {
//   console.log("Connected frontend");

//   socket.on("message", (data) => {
//     console.log("Message Received:", data);
//     socket.emit("message", getRandomMsg());
//     console.log("\n\nroom: ", room);
//     if (room) io.to(room).emit("message", getRandomMsg());
//   });

//   socket.on("joinRoom", (roomId) => {
//     room = roomId;
//     socket.join(roomId);
//   });

//   socket.on("disconnect", () => {
//     console.log("Disconnected frontend");
//   });
// });

// httpServer.listen("8000", () => {
//   console.log("server is listening on port 8000");
// });

const port = 8000;
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://127.0.0.1:5500`,
  },
});
let socket_user_id = "";
io.on("connection", (socket) => {
  socket_user_id = socket.handshake.query.userId;
  socket.join(socket_user_id);
  console.log("Connected frontend");
});

let timer;
app.get("/getCounter", (req, res) => {
  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    let i = Math.floor(Math.random() * 10);
    io.to(socket_user_id).emit("counter", i);
  }, 10);
  res.status(200).json({ msg: "Timer started" });
});

server.listen(port, () => {
  console.log(
    `Server is listening on port ${port}\nURL: http://127.0.0.1:${port}`,
  );
});
