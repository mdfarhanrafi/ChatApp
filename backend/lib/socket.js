import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://chatapp-xy0c.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Online users storage
const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.userId = userId; // Store userId inside socket object
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (socket.userId) delete userSocketMap[socket.userId]; // Use stored userId
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Function to get socket ID of a receiver
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io, app, server };
