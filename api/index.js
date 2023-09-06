import dotenv from "dotenv"
import express from "express"
import { Server } from "socket.io"
import cors from "cors"
import http from "http"

dotenv.config();

var app = express();

app.use(cors());
app.use(express.json());

var httpServer = http.createServer(app);

var server = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
    path: "/socket.io"
});

app.get("/", (req, res) => res.send({message: "Hello world!"}));

server.on("connection", socket => {

    console.log(`Connection received: ${socket.id}`);
    
    socket.on("join_channel", (data) => { 
        socket.join(data);
        console.log(`${data} entrou no chat`)
    });
    
    socket.on("disconnect", () => console.log(`Disconnect: ${socket.id}`));

});

httpServer.listen(process.env.PORT, () => console.log(`Listening to ${process.env.PORT}.`));