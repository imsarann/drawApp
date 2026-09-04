import axios from 'axios'
import React from 'react'
import { BACKEND_URL } from '../app/config'
import ChatRoomClient from './ChatRoomClient'

async function getChats(roomId : string){
    const response = await axios.get(`${BACKEND_URL}/chat/${roomId}`)
    return response.data.messages
}

export default async function ChatRoom({
    id
}:{
    id : string
}){
    const messages = await getChats(id)
    return(
        <ChatRoomClient id={id} messages={messages} />
    )

}
