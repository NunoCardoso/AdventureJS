function full() {
    var el = document.getElementById('canvasdiv');
    if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen();
    } else {
        el.mozRequestFullScreen();
    }
}
