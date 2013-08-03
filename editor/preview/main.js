/*global define, $ */

define([
    'engine/game',
    'games/compass/compass'
], function (
    Game,
    compass
) {
    var game,
        _createDialog = function () {
            $("#canvasdiv").css('display', 'block').dialog({
                width  : 820,
                height : 660
            });
        },

        _initGame = function () {
            game = new Game();
            game.init();
            game.load(compass);
        },

        start = function (scene) {
            _createDialog();
            _initGame();
            game.start({
                scene: scene || 'scene.menu'
            });
        };

    return {
        'start' : start
    };
});