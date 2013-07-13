/*global define, $, createjs */

/**
 * This module preloads images
 */
define([
], function (
) {
    var play = function (item) {
        createjs.Sound.play(item);
    };

    return {
        'play' : play
    };
});