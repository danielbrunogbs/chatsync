const dotenv = require("dotenv");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");

/* Controllers */
const JoinChannelController = require("./app/controllers/JoinChannelController.js");
const SendMessageController = require("./app/controllers/SendMessageController.js");

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

    socket.on("join_channel", (username, avatar) =>  JoinChannelController(socket, username));
    socket.on("send_message", (data) => SendMessageController(socket, data));

    socket.on("disconnect", () => console.log(`Disconnect: ${socket.id}`));

});

httpServer.listen(process.env.PORT, () => console.log(`Listening to ${process.env.PORT}.`));