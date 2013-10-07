/*global define, jQuery */

/**
 * This module will select a game and bootstrap it into the game engine
 */

define([
    'engine/game/game'
], function (
    Game
) {
    var _game,

        getGame = function () {
            return _game;
        },

        init = function () {

            _game = new Game();
            _game.init();
            var deferred = _game.load();
            deferred.done(function () {
                _game.start({
                    scene    : 'scene.menu',
                    canvas   : 'canvas',
                    role     : 'play'
                });
            });
        };

    // TODO: to remove when we have a way to load a game, then trigger the init method
    init();

    return {
        'init' :  init,
        'getGame' : getGame
    };
});