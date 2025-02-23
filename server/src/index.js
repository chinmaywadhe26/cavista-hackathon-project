import 'dotenv/config';
import express from 'express';
import router from './routes/apiRoute.js';
import connectDb from './db/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from "socket.io";
import http from "http";
import { ACTIONS } from "./utils/ACTIONS.js";

const app = express();
const server = http.createServer(app);

const port = process.env.PORT;
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
connectDb();
app.use('/', router);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});


let activeRoom = null; 

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (room) => {
    socket.join(room);
    activeRoom = room; 
    socket.to(room).emit("user-joined", socket.id);
  });

  socket.on("offer", (data) => {
    socket.to(data.room).emit("offer", data.offer);
  });

  socket.on("answer", (data) => {
    socket.to(data.room).emit("answer", data.answer);
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.room).emit("ice-candidate", data.candidate);
  });

  socket.on("disconnect", () => {
    io.emit("user-left", socket.id);
    activeRoom = null; 
  });

  socket.on("end-call", (room) => {
    io.to(room).emit("call-ended");
    activeRoom = null;
  });

  socket.on("check-active-room", () => {
    socket.emit("active-room-status", activeRoom !== null);
  });
});


server.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
