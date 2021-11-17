const screenshot = require('screenshot-desktop')
const fs = require('fs');

module.exports = class ScreenSharer {
    constructor(io, fps) {
        this.io = io;
        this.fps = fps || 10;
    }

    start() {
        screenshot({ format: 'jpg' }).then(img => {
            var base64 = img.toString('base64');
            this.io.emit('SCREEN_IMAGE', { data: 'data:image/jpg;base64,' + base64 });
            base64 = null;
        });

        return setTimeout(() => this.start(), 1000 / this.fps);
    }


}
