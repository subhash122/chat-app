const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

let users = [];

const addUser = (name, id) => {
    !users.some((user) => user.id === id) && users.push({ id, name })

}
const removeUser = (socketId) => {
    users = users.filter((user) => user.id !== socketId);
};

const findUser = (id) => {
    return users.find((user) => user.id === id)
}

const onConnection = (socket) => {
    /*
     When a new user connects to our server, we expect an event called "newUser"
     */
    socket.on("newUser", function (data) {
        addUser(data.name, socket.id)
    });

    /*
     When a user want to broadcast a message, we expect an event called "sendMessage"
    */
    socket.on("sendMessage", function ({ messageText }) {
        let user = findUser(socket.id);
        if (user) {
            socket.broadcast.emit("broadcastMessage", { id: user.id, username: user.name, message: messageText });
        }

    });

    /*
     When a client disconnects from the server, the event "disconnect" is automatically
     captured by the server.
     */
    socket.on("disconnect", function () {
        removeUser(socket.id);
    });
}

io.on("connection", onConnection);


httpServer.listen(4000, function () {
    console.log("Server up and running on port 4000");
});