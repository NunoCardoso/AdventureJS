/*global define, jQuery */

/**
 * This module will select games and bootstrap them
 */

define([
	'engine/game',
	'games/compass'
], function (Game, compass) {

    (function ($) {
        $(function () {
            var game = new Game(compass);
            game.start();
        });
    }(jQuery));
});