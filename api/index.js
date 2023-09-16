import dotenv from "dotenv"
import express from "express"
import { Server } from "socket.io"
import cors from "cors"
import http from "http"
import JoinChannelController from "./app/controllers/JoinChannelController.js"
import SendMessageController from "./app/controllers/SendMessageController.js"

dotenv.config();

var app = express();

app.use(cors());
app.use(express.json());

var httpServer = http.createServer(app);

var server = new Server(httpServer, {
    path: "/socket.io"
});

app.get("/", (req, res) => res.send({message: "Hello world!"}));

server.on("connection", socket => {

    console.log(`Connection received: ${socket.id}`);

    socket.on("join_channel", (username, sex) => JoinChannelController(socket, username, sex));
    socket.on("send_message", (data) => SendMessageController(socket, data));

    socket.on("disconnect", () => console.log(`Disconnect: ${socket.id}`));

});

httpServer.listen(process.env.PORT, () => console.log(`Listening to ${process.env.PORT}.`));