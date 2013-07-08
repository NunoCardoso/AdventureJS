/*global define, $, createjs */

/**
 * This module preloads images
 */
define([
], function (
) {

    var queue;
    var preload = function (options) {
            var manifest = [],
                queue = new createjs.LoadQueue();

            queue.addEventListener("complete", options.onComplete);
            // options.images structure is identical of the loadqueue manifest
            queue.loadManifest(options.images);
        },

        getQueue = function () {
            return queue;
        },

        get = function (item) {
            queue.getResult(item);
        };

    return {
        'preload' : preload,
        'get' : get,
        'getQueue' : getQueue
    };
});