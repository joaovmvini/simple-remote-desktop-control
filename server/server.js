const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const ioc = require('socket.io-client');
const remoteSocket =  ioc.connect('http://f89c-177-12-101-74.ngrok.io', { reconnection: true });

app.use(express.static('../public'));

io.on('connection', (socket) => {
   socket.on('SCREEN_IMAGE', (content) => {
        io.emit('SCREEN_IMAGE', content);
   });

   socket.on('MOUSE_MOVE', (coords) => {
        io.emit('MOUSE_MOVE', coords);
   });

   socket.on('SCREEN_DIMENSIONS', (dimensions) => {
        io.emit('SCREEN_DIMENSIONS', dimensions);
   });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
