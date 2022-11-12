import express from "express";
const {pathname:root} = new URL("..", import.meta.url);

const rout = express.Router();

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> fc06dc8 (beta hosted version)
rout.get("/logIn", (req,res)=>{
    res.sendFile("/public/logIn.html",{root:"."})
})

rout.get("/chat", (req,res)=>{
<<<<<<< HEAD
=======
=======
rout.get("/", (req,res)=>{
>>>>>>> e0857cc (Local version)
>>>>>>> fc06dc8 (beta hosted version)
    res.sendFile("/public/chat.html",{root:"."})
})

export const router = rout;