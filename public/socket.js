const socketInitializator = (function (viewer_element, pointer) {
    const viewerDimensions = {
        width: viewer_element.clientWidth,
        height: viewer_element.clientHeight
    };
    
    const utils = {};

    const realDimensions = {
        width: null,
        height: null
    };
    
    const mouseState = {
        x: 0,
        y: 0
    };
    
    const socket = io();
    
    if (! localStorage.w && ! localStorage.h) {
    
        socket.on('SCREEN_DIMENSIONS', (dimensions) => {
            realDimensions.width = localStorage.w = dimensions.width;
            realDimensions.height = localStorage.h = dimensions.height;

            utils.realDimensions = realDimensions;
        });
    
    } else {
        realDimensions.width = Number(localStorage.w);
        realDimensions.height = Number(localStorage.h);

        utils.realDimensions = realDimensions;
    }
    
    socket.on('SCREEN_IMAGE', (content) => {
        viewer_element.style.backgroundImage = `url(${content.data})`;
    });
    
    socket.on('MOUSE_MOVE', (event) => {
        if (realDimensions.width && realDimensions.height) {
            mouseState.x = (event.x * viewerDimensions.width) / realDimensions.width;
            mouseState.y = (event.y * viewerDimensions.height) / realDimensions.height;
            
            pointer.style.left = (mouseState.x - 2) + 'px';
            pointer.style.top = (mouseState.y - 2) + 'px';
        }
    });

    return {
        socket, 
        utils
    }
});