import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';

const socketUrl = 'https://chat-app-1gme.onrender.com'


const socket = io(socketUrl);

const SocketContext = createContext();

/*
 handles all the logic related to socket - listening to incomming messages and 
 emitting messages to server.
 */
const SocketProvider = ({ children }) => {
    const [newMessage, setnewMessage] = useState(null);
    const [username, setUsername] = useState('');

    const addNewUser = useCallback((name) => {
        setUsername(name);
        try {
            socket.emit('newUser', { name });
        } catch (error) {
            console.log(error)
            toast(error.message??'something went wrong, please try again later');   
        }
    }, [])

    const sendMessage = useCallback((message) => {
        try {
            socket.emit('sendMessage', { messageText: message });
        } catch (error) {
            toast(error.message??'something went wrong, please try again later');
        }
    }, [])

    useEffect(() => {

        socket.on('broadcastMessage', (data) => {
            setnewMessage(data);
        })

    }, [])
    return (
        <SocketContext.Provider
            value={{
                username,
                newMessage,
                addNewUser,
                sendMessage,
            }}
        >
            <ToastContainer></ToastContainer>
            {children}
            
        </SocketContext.Provider>
    );
}
const useSocket = () => useContext(SocketContext);


export { SocketProvider, useSocket, socket }