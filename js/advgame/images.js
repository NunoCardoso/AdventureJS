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
                key,
                queue = new createjs.LoadQueue();

            queue.addEventListener("complete", options.onComplete);

            for (key in options.images) {
                if (options.images.hasOwnProperty(key)) {
                    manifest.push({
                        'id': key,
                        'src' : options.images[key]
                    });
                }
            }
            queue.loadManifest(manifest);
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