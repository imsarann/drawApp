import { useEffect, useState } from "react"
import { WEBSCOKET_URL } from "../app/config";

export default function useSocket() {
    const [loading, setLoading] = useState(true)
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(WEBSCOKET_URL);
        ws.onopen = () =>{
            setLoading(false)
            setSocket(ws)
        }
    })
  return {
    socket,
    loading
  }
}
