require.config({
    baseUrl: './',
    paths: {
        'createjs'   : 'lib/createjs-2013.09.25.min',
        'jquery'     : 'lib/jquery-2.0.3.min',
        'jquery-ui'  : 'lib/jquery-ui',
        'jcookie'    : 'lib/jquery.cookie.min',
        'handlebars' : 'lib/handlebars',
        'fullscreen' : 'js/fullscreen'
    },
    'shim': {
        'jcookie' : ['jquery']
    }
});
// Load the main app module to start the app
require([
    "createjs", "jquery", "jcookie", "handlebars", "fullscreen", "engine/main"
], function (c, j, jc, h, f, m) {
    m.init();
});