const viewerMouse = (function (main_content, socket, utils) {
    const object = {};

    const viewerRect = main_content.getBoundingClientRect();
    
    const getRealDimensions = (cb) => {
        if (! utils.realDimensions) {
            return setTimeout(() => waitForRealDimensions(cb), 250);
        }

        cb(utils.realDimensions);
    };

    const setEvents = function() {
        getRealDimensions(function(remoteDimensions) {
            main_content.addEventListener('mousemove', (evt) => {
                var x = evt.clientX - viewerRect.left;
                var y = evt.clientY - viewerRect.top;
    
                x = Math.abs(x);
                y = Math.abs(y);
    
                x = (remoteDimensions.width * x) / viewerRect.width;
                y = (remoteDimensions.height * y) / viewerRect.height;

                socket.emit('REMOTE_MOUSE_MOVE', { x, y });
            });
        })
    };

    setEvents();

    return object;
});