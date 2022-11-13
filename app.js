import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import {PORT} from "./config/deploy.js";
import {router} from "./config/router.js";

const app = express();
app.use(express.static("public"))
app.use(bodyParser.json())
app.use("/",router);
app.use(express.urlencoded({extended:true}))
const server = http.Server(app);
const io = new Server(server);

var users = [];
var userWrt = [];


io.on("connection", function(Socket){
    console.log(Socket.id+" conectado.");
    io.emit("userConnected", users);

    Socket.on("disconnect", ()=>{
        console.log(`${Socket.id} desconectado.`);
        if (Socket.name != null){
            users = users.filter(function(User){
                return User != Socket.name;
            });
            userWrt = userWrt.filter(function(User){
                return User != Socket.name;
            });
            io.emit("userWritting", userWrt);
            io.emit("userConnected", users);
            io.emit("userDisconnected", Socket.name);
        }
    });

    Socket.on("newMessage", (msg)=>{
        userWrt = userWrt.filter(function(User){
            return User != Socket.name;
        });
        io.emit("userWritting", userWrt);
        var data = {name : Socket.name, message : msg}
        io.emit("newMessage", data);
    });

    Socket.on("userConnected", (data)=>{
        users.push(data);
        Socket.name = data;
        console.log(users)
        io.emit("userConnected", users);
    });

    Socket.on("userWritting", ()=>{
        var index = userWrt.indexOf(Socket.name);
        if (index === -1){
            userWrt.push(Socket.name);
        }
        io.emit("userWritting", userWrt);
        console.log(userWrt);
    });

    Socket.on("userNotWritting",()=>{
        userWrt = userWrt.filter(function(User){
            return User != Socket.name;
        });
        io.emit("userWritting", userWrt);
        console.log(userWrt);
    });
});

server.listen(PORT, () =>{
    console.log(`Escuchando en el puerto ${PORT}`);
});