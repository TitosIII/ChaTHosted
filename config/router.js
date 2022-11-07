import express from "express";
const {pathname:root} = new URL("..", import.meta.url);

const rout = express.Router();

rout.get("/logIn", (req,res)=>{
    res.sendFile("/public/logIn.html",{root:"."})
})

rout.get("/chat", (req,res)=>{
    res.sendFile("/public/chat.html",{root:"."})
})

export const router = rout;