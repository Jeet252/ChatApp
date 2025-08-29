import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://stoa-vrksah.app"],
    credentials: true,
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connect", (socket) => {
  socket.on("Connection Established", (data) => {
    socket.broadcast.emit("message", `${data} has join the room`);
  });
  socket.on("Change Username", (username) => {
    io.emit("message", username);
  });
  socket.on("message", (msg) => {
    io.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log("socket id : ", socket.id, " is disconnect");
  });
});

server.listen(port, () => {
  console.log("server is running at http://localhost:3000");
});
