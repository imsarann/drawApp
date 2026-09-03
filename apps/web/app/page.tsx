"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  return (
    <div className="flex w-screen h-screen justify-center items-center">
  <div className="flex gap-2">
    <input 
      type="text"
      placeholder="Enter a room number" 
      onChange={(e) => setRoomId(e.target.value)} 
      className=" border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button 
      onClick={() => router.push(`/room/${roomId}`)}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Join Room
    </button>
  </div>
</div>
  );
}
