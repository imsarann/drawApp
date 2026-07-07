import express from "express";
// import jwt from "jsonwebtoken"
// import { JWT_SECRET } from "@repo/backend-common/config";
import { middlewar } from "./middleware";
import { CreateUserSchema } from "@repo/common/types"
import { SigninSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client"

const app = express()
app.use(express.json());

// console.log("DATABASE_URL =", process.env.DATABASE_URL);
// console.log("cwd:", process.cwd());
// console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.listen(3001, ()=>{
  console.log("express connected");
})

app.post("/signup", async (req, res) => {
  console.log("Control reached to signup endpoint")
  const parsedData = CreateUserSchema.safeParse(req.body);
  console.log("body", req.body)
  
  if (!parsedData.success) {
    return res.status(400).json({
      message: "Incorrect inputs",
    });
  }


  try {
    await prisma.user.create({
      data: {
        email: parsedData.data.username,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });

    return res.json({
      message: "You have successfully signed up",
    });
  } catch (e) {
    return res.status(409).json({
      // message: "User already exists with this email",
      e
    });
  }
});

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
  // const token = jwt.sign(userId, JWT_SECRET)
  res.json({
    message : "You have successfully logged in , Welcome back",
    // token 
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