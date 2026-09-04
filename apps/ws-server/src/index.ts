import{ WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
const wss  = new WebSocketServer({ port : 3001});

interface User {
    ws : WebSocket;
    rooms : string[];
    userId : string;
}


const users: User[] = [];
// const rooms = [];

function checkUser(token : string): string | null{
    const decoded = jwt.verify(token,JWT_SECRET);
    if(typeof decoded === "string"){
        return null;
    }
    if(!decoded || !decoded.userId){
        return null;
    }
    //@ts-ignore
    return decoded.userId;
} 

wss.on("connection", (ws, request) => {
    console.log("websocket connected");
    const url = request.url;
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1])
    const token = queryParams.get("token") ?? ""; 
    const userId = checkUser(token);
    if(userId == null){
        ws.close();
        return; 
    } 
    users.push({

        //@ts-ignore
        ws,
        rooms : [],
        userId 
    })
    ws.on("message", async (data : any)=>{
        const parsedData = JSON.parse(data as unknown as string);
        console.log(parsedData)
        if(parsedData.type === "join_room"){
            //@ts-ignore
            const user : any  = users.find(x => x.ws === ws)
            user?.rooms.push(parsedData.roomId)
        } 
        // ws.send("pong")
        if(parsedData.type === "leave_room"){
            //@ts-ignore
            const user : any = users.find(x => x.ws === ws)
            //@ts-ignore
            user.rooms = user.rooms.filter(r => r === parsedData.room )
        }
        if(parsedData.type === "chat"){
            const roomId = parsedData.roomId
            const  message = parsedData.message
            console.log("message received in WS backend : ",message )
            const roomusers = users.filter(user => user.rooms.includes(roomId));
            // sotre in db asynchronously to avoid delay in broacasting messages (key : queue)
            await prismaClient.chat.create({
                data:{
                    roomId : roomId,
                    message :  message,
                    userId : userId
                }
            })
            roomusers.forEach(roomUser => roomUser.ws.send(JSON.stringify({
                type : "Chat",
                message : message,
                roomId 
            })))
        }
    })
    
})



