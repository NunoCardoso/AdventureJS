/*global define, $, createjs */

/**
 * This module preloads images
 */
define([
    'engine/gamestage'
], function (
    gamestage
) {

    var queue,
        queueLoaded,

        preload = function (options) {
            var manifest = [],
                queue = new createjs.LoadQueue();

            queue.addEventListener("fileload", function (e) {
                console.log(e);
                gamestage.update();
            });

            queue.addEventListener("complete", options.onComplete);
            // options.images structure is identical
            // of the loadqueue manifest,
            // so is options.sounds
            queue.loadManifest(options.assets);
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