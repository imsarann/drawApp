import express from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middlewar } from "./middleware";
import { CreateUserSchema } from "@repo/common/types"
import { SigninSchema } from "@repo/common/types";
import { createRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client"

const app = express()

app.listen(3000, ()=>{
  console.log("express connected");
})

app.post("/signup", async (req, res)=>{
  
  const parsedData  = CreateUserSchema.safeParse(req.body)
  if(!parsedData.success){
    res.json({
      message : "Incorrect inputs"
    })
    return;
  }
  try{
await prismaClient.user.create({
    data: {
      email : parsedData.data.username,
      password : parsedData.data.password,
      name : parsedData.data.name,
      
    }
  })
  }catch(e){
    res.status(411).json({
      message : "User already exists with this email"
    })
  }
  // const userId = req.body.userId;
  //   //dataase check
  // const token = jwt.sign(userId, JWT_SECRET)
  res.json({
    message : "You have successfully singed up",
    // token 
})

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