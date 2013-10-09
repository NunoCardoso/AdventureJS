/*global define, $ */

define([
    'engine/game/game'
], function (
    Game
) {
    var _game,

        _createDialog = function () {
		
            $("#canvasdiv").css('display', 'block').dialog({
                width  : 820,
                height : 660
            });
        },

        init = function (game) {
            _createDialog();
            _game = new Game();
            _game.init();
            _game.loadAsPreview(game);
            _game.start({
                scene    : 'scene.menu',
                canvas   : 'canvas',
                role     : 'play'
            });
        };

    return {
        'init' : init
    };
});