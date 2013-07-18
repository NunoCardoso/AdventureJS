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
    (function ($) {
        $(function () {
            var game = new Game();
            game.init();
            game.load(compass);
            game.start();
        });
    }(jQuery));
});