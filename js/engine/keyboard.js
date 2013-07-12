/*global define, createjs, $ */

/**
 * This module dispatches key events
 */
define([
    'engine/gamestage'
], function (gamestage) {

    var onKeyDown = function (e) {
        console.log('key down');
    },

        attachEvents = function () {
            $(window).keydown($.proxy(onKeyDown, this));
        };
//    gamestage.onkeyup = handleKeyUp;

    return {
        'attachEvents' : attachEvents
    };
});