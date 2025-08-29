import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = process.env.PORT;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.URL,
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
    socket.broadcast.emit("message", `${socket.id} has dissconnected`);
    console.log("socket id : ", socket.id, " is disconnect");
  });
});

server.listen(port, () => {
  console.log("server is running at http://localhost:3000");
});
