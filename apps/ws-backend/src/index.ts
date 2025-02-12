import { CONNECTING, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port : 8080 });

wss.on('connection', (ws)=>{
    ws.on('error', ()=>{
        console.error
    })
    ws.on('message', (data)=>{
        ws.send('ping')
        console.log("message received "+data);
    })
})