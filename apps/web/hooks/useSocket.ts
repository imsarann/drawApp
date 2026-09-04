import { useEffect, useState } from "react"
import { WEBSCOKET_URL } from "../app/config";

export default function useSocket() {
    const [loading, setLoading] = useState(true)
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(`${WEBSCOKET_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZjdlYTg3MC04MWE0LTQ0MTctYTk5MS1lYjljMzE0YjRlNGMiLCJpYXQiOjE3ODczOTY5MDl9.B68k8w6gIeFp1alQWa9jpc7heqp_6RJUe1DhWxOhnRQ`);
        ws.onopen = () =>{
            setLoading(false)
            setSocket(ws)
        }
    }, [])
  return {
    socket,
    loading
  }
}
