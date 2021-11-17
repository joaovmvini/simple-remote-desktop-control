const ioc = require('socket.io-client');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const remoteSocket = ioc.connect('http://localhost:3000', { reconnection: true });

const ScreenSharer = require('./screen_sharer/sharer');
const sharer = new ScreenSharer(remoteSocket, 1);

const EventHandler = require('./event_handler/index');
const eventHandler = new EventHandler(remoteSocket);

io.on('connection', (socket) => {
   sharer.start();
   eventHandler.start();
});

server.listen('8080', () => {
    console.log('listening on *:8080');
});

