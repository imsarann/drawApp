import React from 'react'
import axios from 'axios'
// import 
import { BACKEND_URL } from '../../config'
import ChatRoom from '../../../components/ChatRoom'

async function getRoom(slug : string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    return response.data.id
}

export default async function ChatRoom1({ 
    params
} : {
    params : {
        slug : string
    }
}) {
    const slug = await params.slug;
    const roomId = await getRoom(slug)

    console.log("Room name : ",roomId)
  return (
        <ChatRoom id={roomId}>

    </ChatRoom>
  )
}
