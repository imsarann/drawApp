import { z } from "zod";

const CreateUserSchema = z.object({
    username : z.string(),
    password : z.string(),
    name : z.string()  
})

const SigninSchema = z.object({
    username : z.string(),
    password : z.string(),
    name : z.string()  
})

const createRoomSchema = z.object({
    name : z.string().min(3).max(20)
})

export {CreateUserSchema, SigninSchema, createRoomSchema  } 