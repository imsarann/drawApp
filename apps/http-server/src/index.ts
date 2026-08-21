import express from "express";
import { middleware } from "./middleware";
import { CreateUserSchema } from "@repo/common/types"
import { SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
const app = express()
app.use(express.json());

app.listen(3001, ()=>{
  console.log("express connected 3001");
})

// Get endpoint

app.get("/", (req, res)=>{
  console.log("Control reached to root '/' endpoint")
  res.json({
    message : "Hello from express server"
  })
})

// Signup endpoint

app.post("/signup", async (req, res) => {

  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      message: "Incorrect inputs",
    });
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.username,
        // hash the password before storing it in the database
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });
    const token = jwt.sign({ userId : user.id }, JWT_SECRET);
    return res.json({
      message: "You have successfully signed up",
      // should return jwt token
      userId : user.id,
      token : token
    });
  } catch (e) {
    return res.status(409).json({
      message: "User already exists with this email",
      e
    });
  }
});

app.post("/signin", async (req, res)=>{
  const parsedData = SigninSchema.safeParse(req.body)
  if(!parsedData.success){
    res.json({
      message : "Invalid inputs"
    })
    return
  }
  // compare the password with the hashed password in the database
    const user = await prismaClient.user.findUnique({
      where : {
        email : parsedData.data.username,
        password : parsedData.data.password
      }
    })    
    if(!user){
        return res.status(401).json({
            message: "User not found or incorrect credentials",
        });
    }
    const token = jwt.sign({ userId : user.id }, JWT_SECRET);
  res.json({
    message : "You have successfully logged in , Welcome back", 
    token : token
  })
  
})



app.post("/room", middleware, async (req, res)=>{
    
  const parsedData  = CreateUserSchema.safeParse(req.body)
  if(!parsedData.success){
    res.json({
      message : "Incorrect inputs"
    })
    return
  }
  // @ts-ignore
  const userId = req.userId;
  const room = await prismaClient.room.create({
    data : {
        slug : parsedData.data.name,
        adminId : userId
    }
  })
  res.json({
    message : "Room created successfully",
    roomId : room.id
  })

})