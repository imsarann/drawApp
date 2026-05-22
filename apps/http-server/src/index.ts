import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middlewar } from "./middleware";
import { CreateUserSchema } from "@repo/common/types"
import { SigninSchema } from "@repo/common/types";
import { createRoomSchema } from "@repo/common/types";
const app = express()

app.listen(3000, ()=>{
  console.log("express connected");
})

app.post("/signin", (req, res)=>{
  const data = SigninSchema.safeParse(req.body)
  if(!data.success){
    res.json({
      message : "Invalid inputs"
    })
    return
  }
  // database check
  //store in database
  const token = jwt.sign(userId, JWT_SECRET)
  res.json({
    message : "You have successfully logged in , Welcome back",
    token 
  })
  
})

app.post("/signup", (req, res)=>{
  
  const data  = CreateUserSchema.safeParse(req.body)
  if(!data.success){
    res.json({
      message : "Incorrect inputs"
    })
    return

  }
  const userId = req.body.userId;
    //dataase check
  const token = jwt.sign(userId, JWT_SECRET)
  res.json({
    message : "You have successfully singed up",
    token 
})

})

app.post("/room", middlewar, (req, res)=>{
    
  const data  = CreateUserSchema.safeParse(req.body)
  if(!data.success){
    res.json({
      message : "Incorrect inputs"
    })
    return

  }
  // db call
  res.json({
    roomId : 1
  })

})