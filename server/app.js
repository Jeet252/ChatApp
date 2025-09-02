import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = process.env.PORT;

const app = express();
const server = createServer(app);
const users = new Map();
const io = new Server(server, {
  cors: {
    origin: process.env.URL,
    credentials: true,
  },
  maxHttpBufferSize: 1e8,
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connect", (socket) => {
  socket.on("Connection Established", (data) => {
    users.set(socket.id, data);
    io.emit("Users in Room", [...users.entries()]);
    socket.broadcast.emit("message", {
      socketId: socket.id,
      user: data,
      announcement: `${data} has join room`,
    });
  });
  socket.on("Change Username", (data) => {
    users.set(socket.id, data.newUsername);
    io.emit("message", {
      oldUsername: data.oldUsername,
      newUsername: data.newUsername,
      socketId: socket.id,
    });
  });
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", data);
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("message", `${socket.id} has dissconnected`);
    users.delete(socket.id);
    io.emit("Users in Room", [...users.entries()]);
  });
});

server.listen(port, () => {
  console.log("server is running at http://localhost:3000");
});
