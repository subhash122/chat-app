import { useState } from "react";
import './index.css'
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../contexts/SocketContext";
const JoinChat = () => {
    const [name, setname] = useState("");
    const navigator = useNavigate();
    const { addNewUser } = useSocket()
    
    const addUser = () => {
        if (name) {
            addNewUser(name);
            navigator('/chat');
        }
    }
    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <h1>CHAT-ROOM</h1>
                <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
                <button onClick={addUser} className="joinbtn">Login In</button>
            </div>
        </div>
    )
}

export { JoinChat }