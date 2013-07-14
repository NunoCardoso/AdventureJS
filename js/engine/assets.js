/*global define, $, createjs */

/**
 * This module preloads images
 */
define([
  //  'engine/gamestage'
], function (
 //   gamestage
) {

    var queue,
        queueLoaded,

        preload = function (options) {
            var manifest = [],
                queue = new createjs.LoadQueue();

            queue.addEventListener("fileload", function (e) {
                // write the name of the file loaded
                options.loadedFile.text = e.item.src;
                options.progressBar.add();
            //    gamestage.update();
            });

            queue.addEventListener("complete", options.onComplete);
            // options.images structure is identical
            // of the loadqueue manifest,
            // so is options.sounds
            queue.loadManifest(options.assetList);
        },

        setQueueLoaded = function (_queueLoaded) {
            queueLoaded = _queueLoaded;
        },

        getQueueLoaded = function () {
            return queueLoaded;
        };

    return {
        'preload' : preload,
        'setQueueLoaded' : setQueueLoaded,
        'getQueueLoaded' : getQueueLoaded
    };
});