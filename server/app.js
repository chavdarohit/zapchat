import express from "express";
import http from "http";
import { Server as socketIo } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const server = http.createServer(app);
const io = new socketIo(server);
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello from the server!"));

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
