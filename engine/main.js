/*global define, jQuery */

/**
 * This module will select a game and bootstrap it into the game engine
 */

define([
    'engine/game/game'
], function (
    Game
) {
    var _user = "Me",
        _game,

        setUser = function (user) {
            _user = user;
        },

        getUser = function () {
            return _user;
        },

        init = function () {

            _game = new Game();
            _game.init();
            _game.setUser(_user);
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
        'setUser' : setUser,
        'getUser' : getUser,
        'init' :  init
    };
});