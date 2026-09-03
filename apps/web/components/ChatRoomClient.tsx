"use client"

import { useEffect, useState } from "react"
import useSocket from "../hooks/useSocket"
import axios from "axios"
import { BACKEND_URL } from "../app/config"

export default function ChatRoomClient({
    messages,
    id
}:{
    messages : { message :string },
    id : string
}){

  const [chats, setChats] = useState(messages)
  const { socket, loading } = useSocket();
  const [currentMessage, setCurrentMessage] = useState("")
  useEffect(()=>{
    if (socket && !loading){

      socket.send(JSON.stringify({
        type: "join_room",
        roomId : id
      }))

      socket.onmessage = ((event)=>{
          const parsedData = JSON.parse(event.data)
          if (parsedData.type === "chat"){
            //@ts-ignore
              setChats(c  => [...c, {message : parsedData.message}])
          }
      
      })
    }
  }, [socket, loading, id])

  function onClickSend(currentMessage : any){
            //@ts-ignore
    setChats(c  => [...c, {message : currentMessage}])
    socket?.send(JSON.stringify({
      type : "chat",
      roomId : id,
      messages : currentMessage
    }))
    setCurrentMessage("")
  }

  return (
    <div>
        
      {
            //@ts-ignore
      messages.map( m => <div> {m.message}</div>)}
      <input type="text" value={currentMessage} onChange={(e) => 
          setCurrentMessage(e.target.value)
          }/>
      <button className="" onClick={(e) => onClickSend(currentMessage)}>
        Send
      </button>
    </div>
  )
}
