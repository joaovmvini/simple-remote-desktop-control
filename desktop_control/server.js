const ioc = require('socket.io-client');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const remoteSocket = ioc.connect('http://bd9d-177-12-101-74.ngrok.io', { reconnection: true });

const ScreenSharer = require('./screen_sharer/sharer');
const sharer = new ScreenSharer(remoteSocket, 5);

const EventHandler = require('./event_handler/index');
const eventHandler = new EventHandler(remoteSocket);

io.on('connection', (socket) => {
   console.log('connected');

   sharer.start();
   eventHandler.start();
});

server.listen(8080, () => {
    console.log('listening on *:8080');
});

