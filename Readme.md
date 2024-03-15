## OVERVIEW
A simple chatting application. it contains a chat room. user can join the chat room by providing username. user sends a message and it is broadcasted to everyone connected to the server.


## Application code structure(architecture)
Root directory contains two folders: 
`Client` - it contains all frontend code in React which handles the UI logic.
`Server` - it contains nodeJS server along with socket, which handles the realtime communication. SocketIO library is used to handle socket connections.

#### `Client` :
- Client Directory contains src folder, which has UI interfaces and UI logic. 
- components folder inside src contains react functional components which makes the whole ui.
- contexts folder inside src has socket client, which contains all the logic related to socket connection on the client side.

#### `Server` :
- Server directory has the server.js file, which contains logic related to node server and socket connections.

`Concurrency` is handled via NodeJS async-await pattern. it has event loop which handles multiple concurrent request. while one client is in the main thread others are waiting in the queue for their turn.Since there is no heavy computation work, it can handle multiple request in an efficient manner

## Running client and server
- please make sure node.js is installed on your machine.
- go inside server folder. install the depencencies using `npm install` command. run the server using `npm run start` command. 
- Go inside client folder. paste the server url in socketUrl variable present inside `src/contexts/SocketContext.js` file. install the depencencies using `npm install` command. run the client using `npm start` command.

## Access deployed Application
Application is deployed on **https://chat-room-07.netlify.app/**. 
