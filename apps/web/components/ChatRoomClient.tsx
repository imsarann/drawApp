"use client"

import { useEffect, useState } from "react"
import useSocket from "../hooks/useSocket"
// import axios from "axios"
// import { BACKEND_URL } from "../app/config"

export default function ChatRoomClient({
    messages,
    id
}:{
    messages : { message :string }[],
    id : string
}){

  const [chats, setChats] = useState(messages)
  const [currentMessage, setCurrentMessage] = useState("")
  const { socket, loading } = useSocket();
  
  useEffect(()=>{
    if (socket && !loading){

      socket.send(JSON.stringify({
        type: "join_room",
        roomId : id
      }))

      socket.onmessage = ((event)=>{

        alert("someone is texting")
          const parsedData = JSON.parse(event.data)
          console.log("parsed data in websocket frontend type",parsedData.type)
          alert("message received")
          if (parsedData.type.toLowerCase() === 'chat'){
            //@ts-ignore
              setChats(c  => [...c, {message : parsedData.message}])
              alert("chats updated")
          }
      
      })
    }
  }, [socket, loading, id])

  function onClickSend(mess : any){
            //@ts-ignore
    setChats(c  => [...c, {message : mess}])
    console.log("Message in chat : ", mess)
    const data = JSON.stringify({
      type : "chat",
      roomId : id,
      message : mess
    })
    console.log("The data before ws store :" ,data)
    socket?.send(data)
    setCurrentMessage("")
  }

  return (
    <div>       
      {
      //@ts-ignore
      chats.map( m => {
        return (
        <div > {m.message}</div>)
          }
        )
      }
      <input type="text" value={currentMessage} onChange={(e) => 
          setCurrentMessage(e.target.value)
          }/>
      <button className="" onClick={(e) => onClickSend(currentMessage)}>
        Send
      </button>
    </div>
  )
}
