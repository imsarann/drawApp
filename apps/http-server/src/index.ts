import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

const app = express()

app.listen(3000, ()=>{
  console.log("express connected");
})

app.post("/signin", (req, res)=>{
  const userId = req.body.userId
  // database check
  //store in database
  const token = jwt.sign(userId, JWT_SECRET)
  res.json({
      message : "You have successfully logged in , Welcome back",
      token 
})
  
})

app.post("/signup", (req, res)=>{

    const userId = req.body.userId;
    //dataase check
    const token = jwt.sign(userId, JWT_SECRET)
    res.json({
      message : "You have successfully singed up",
      token 
})

})

app.post("/room", middleware,  (req, res)=>{
    const token = req.header

})