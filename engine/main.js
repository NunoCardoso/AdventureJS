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
        };

    (function ($) {
        $(function () {
            var game = new Game();
            game.init();
            game.setUser(_user);
            game.load(compass);
            game.start({
                scene: 'scene.menu'
            });
        });
    }(jQuery));

    return {
        'setUser' : setUser,
        'getUser' : getUser
    };
});