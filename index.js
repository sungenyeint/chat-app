let express = require('express');
let http = require('http');
let socket = require('socket.io');
let cors = require('cors');

// let app = express();

// let server = app.listen(3000, () => {
//   console.log('Server is running on port 3000')
// });

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html')
// })
// let io = socket(server);

const app = express();
const server = http.createServer(app);

const io = socket(server, {
    cors: {
        origin: "https://chat-app-ten-pied.vercel.app", // Allow your Vercel client
        methods: ["GET", "POST"],
    },
});

// const PORT = process.env.PORT || 3000;
server.listen(3000, () => {
    console.log(`Server running on port 3000`);
});


io.on("connection", (socket) => {
    console.log("socket conection is ok" + socket.id);
    socket.on("chat", (data) => {
        io.sockets.emit("chat", data)
    })
    socket.on("typing", (name) => {
        console.log(name + " is typing...")
        socket.broadcast.emit("typing", name);
    })
});

