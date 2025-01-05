const express = require('express');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("socket connection is ok " + socket.id);

    socket.on("chat", (data) => {
        io.sockets.emit("chat", data);
    });

    socket.on("typing", (name) => {
        console.log(name + " is typing...");
        socket.broadcast.emit("typing", name);
    });
});
