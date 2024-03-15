import ReactScrollToBottom from "react-scroll-to-bottom";
import sendLogo from "../../images/send.png";
import './index.css'
import { useEffect, useState } from "react";
import { socket, useSocket } from "../../contexts/SocketContext";
import { Message } from "../Message";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
    const { username, newMessage, sendMessage } = useSocket();
    const navigator = useNavigate();
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState({
        id: socket.id,
        username: username,
        message: ''
    });
    useEffect(() => {
        if (!username) {
            navigator('/')
        }
    }, [])

    useEffect(() => {
        if (newMessage) {
            setMessages([...messages, newMessage]);
        }
    }, [newMessage])

    // add the user message to message list and broadcasts it to socket server
    const addNewMessage = () => {
        if (userMessage.message) {
            sendMessage(userMessage.message);
            setMessages([...messages, userMessage]);
            setUserMessage({ ...userMessage, message: '' });
        }
    }

    const handleChange = (e) => {
        setUserMessage({ ...userMessage, message: e.target.value });
    }
    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>CHAT ROOM</h2>
                </div>
                <ReactScrollToBottom className="chatBox" mode="bottom">
                    {messages.map((item, i) =>
                        <Message username={item.id === socket.id ? '' : item.username} message={item.message}
                            classs={item.id === socket.id ? 'right' : 'left'} key={i} />
                    )}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input type="text" id="chatInput" value={userMessage?.message} onChange={handleChange}
                        placeholder={`enter something ${username}`} onKeyDown={(event) => event.key === 'Enter' ? addNewMessage() : null} />
                    <button className="sendBtn" onClick={addNewMessage}><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>
            
        </div>
    )
}

export { ChatRoom }