import express from "express";
const {pathname:root} = new URL("..", import.meta.url);

const rout = express.Router();
rout.get("/", (req,res)=>{
    res.sendFile("/public/chat.html",{root:"."})
})

export const router = rout;