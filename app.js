const http = require("http");
const { Server } = require("socket.io");

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

function getRandomMsg() {
  const msgs = [
    "How are you?",
    "Hello there!",
    "What's up?",
    "Good to see you!",
    "Have a great day!",
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

let room = "";

io.on("connection", (socket) => {
  console.log("Connected frontend");

  socket.on("message", (data) => {
    console.log("Message Received:", data);
    socket.emit("message", getRandomMsg());
    console.log("\n\nroom: ", room);
    if (room) io.to(room).emit("message", getRandomMsg());
  });

  socket.on("joinRoom", (roomId) => {
    room = roomId;
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected frontend");
  });
});

httpServer.listen("8000", () => {
  console.log("server is listening on port 8000");
});
