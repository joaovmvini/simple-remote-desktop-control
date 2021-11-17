(function main() {
    const viewer_element = document.getElementById('screen_view');
    const pointer = document.getElementById('pointer');

    const { socket, utils } = socketInitializator(viewer_element, pointer);
    
    const mouse = viewerMouse(viewer_element, socket, utils);
})();