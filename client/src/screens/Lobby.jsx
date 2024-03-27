import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const socket = useSocket();

  const handleJoinRoom = useCallback((data) => {
    const { email, roomId } = data;
    console.log(email, roomId);
    navigate(`/room/${roomId}`)
  }, [navigate])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    socket.emit("room:join", { email, roomId })
  }, [email, roomId, socket])

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom)
    }
  }, [socket, handleJoinRoom])


  return (
    <div className="w-full">
      <h1>Lobby</h1>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Id</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email id..."
          className="p-2 rounded-lg m-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">Room Number</label>
        <input
          id="room"
          type="text"
          placeholder="Enter Room id..."
          className="p-2 rounded-lg m-2"
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button type="submit" className="p-2 bg-gray-800">Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
