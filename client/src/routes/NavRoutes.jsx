import { Routes, Route } from "react-router-dom";
import { JoinChat } from "../components/JoinChat";
import { ChatRoom } from "../components/ChatRoom";

const NavRoutes = () => {
    return (
        <Routes>
            <Route exact path="/chat" element={<ChatRoom/>}></Route>
            <Route exact path="/" element={< JoinChat />}></Route>
        </Routes>
    )
}
export { NavRoutes }