const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const ScreenSharer = require('../screen_sharer/sharer');
const sharer = new ScreenSharer(io, 1);

const EventHandler = require('../event_handler/index');
const eventHandler = new EventHandler(io);

app.use(express.static('../desktop_control'));

io.on('connection', (socket) => {
    sharer.start();
    eventHandler.start();
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
