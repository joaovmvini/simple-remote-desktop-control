const ioHook = require('iohook');

module.exports = function(socket) {

    ioHook.on('keydown', (event) => {
        socket.emit('REMOTE_KEYDOWN', { key: String.fromCharCode(event.rawcode) });
    });
    
    ioHook.on('mousedown', (event) => {
        if (event.button == 1) {
            var button = 'left';
        } else if (event.button == 2) {
            var button = 'right';
        }

        socket.emit('REMOTE_MOUSE_CLICK', { button });
    });

    ioHook.start();
}

