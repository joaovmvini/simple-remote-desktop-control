const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js");

module.exports = class EventHandler {
    constructor(io) {
        this.io = io;
    }

    sendScreenDimensions(w, h) {
        this.io.emit('SCREEN_DIMENSIONS', { width: w, height: h });
    }

    mouse_move_events() {
        mouse.getPosition().then(point => {
            this.io.emit('MOUSE_MOVE', point);
        });

        return setTimeout(() => this.mouse_move_events(), 10);
    }

    async start() {
        const [w, h] = await Promise.all([screen.width(), screen.height()]);
        this.sendScreenDimensions(w, h);
        this.mouse_move_events();
    }
}

