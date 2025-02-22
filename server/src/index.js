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
const socketUserMap = {};
const rooms = {};


io.on("connection", (socket) => {
    console.log("New connection", socket.id);
   
});

server.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
