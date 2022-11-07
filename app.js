import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { Socket } from "socket.io";
import {PORT} from "./config/deploy.js";
import {router} from "./config/router.js";

const app = express();
app.use(express.static("public"))
app.use(bodyParser.json())
app.use("/",router);
app.use(express.urlencoded({extended:false}))
const server = http.Server(app);
var io = Socket(server)

io.on("connection", function(Socket){
    console.log(Socket.id+" conectado.");
    io.emit("connect",{txt:`${Socket.id} conectado.<br>`});

    io.on("disconnect", ()=>{
        console.log(`${Socket.id} desconectado.`);
        io.emit("disconnected", {txt: `${Socket.id} desconectado.`});
    });

    io.on("msn", (data)=>{
        io.emit("msn", data);
    });

    io.on("wrt", (user)=>{
        io.broadcast.emit("wrt", user);
    });
});

server.listen(PORT, () =>{
    console.log(`Escuchando en el puerto ${PORT}`);
});