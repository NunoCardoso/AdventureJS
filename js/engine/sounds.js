/*global define, $, createjs */

/**
 * This module preloads images
 */
define([
], function (
) {

    var queue,
        queueLoaded,

        preload = function (options) {
            var manifest = [];
            createjs.Sound.addEventListener("loadComplete", options.onComplete);
            // options.images structure is identical of the loadqueue manifest
            createjs.Sound.registerManifest(options.sounds);
        },

        play = function (item) {
            createjs.Sound.play(item);
        };

    return {
        'preload' : preload,
        'play' : play
    };
});