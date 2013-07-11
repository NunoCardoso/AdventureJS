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
            var manifest = [],
                queue = new createjs.LoadQueue();

            queue.addEventListener("complete", options.onComplete);
            // options.images structure is identical of the loadqueue manifest
            queue.loadManifest(options.images);
        },

        setQueueLoaded = function (_queueLoaded) {
            queueLoaded = _queueLoaded;
        },

        getQueueLoaded = function () {
            return queueLoaded;
        },

        get = function (item) {
            queueLoaded.getResult(item);
        };

    return {
        'preload' : preload,
        'get' : get,
        'setQueueLoaded' : setQueueLoaded,
        'getQueueLoaded' : getQueueLoaded
    };
});