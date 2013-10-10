/*global jQuery */

require([
  'jquery'
], function ($) {
    $(function () {
        $('button.gofullscreen').on('click', function () {
            var el = document.getElementById('canvasdiv');
            if (el.webkitRequestFullScreen) {
                el.webkitRequestFullScreen();
            } else {
                el.mozRequestFullScreen();
            }
        });
    });
});