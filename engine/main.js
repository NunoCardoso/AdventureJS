/*global define, jQuery */

/**
 * This module will select a game and bootstrap it into the game engine
 */

define([
    'engine/game',
    'games/compass/compass'
], function (
    Game,
    compass
) {
    var _user = "Me",

        setUser = function (user) {
            _user = user;
        },

        getUser = function () {
            return _user;
        },

        init = function () {
            var game = new Game();
            game.init();
            game.setUser(_user);
            game.load(compass);
            game.start({
                scene: 'scene.menu'
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