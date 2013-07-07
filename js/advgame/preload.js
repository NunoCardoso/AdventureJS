define([], function() {

    var preloadImages = function (options) {
        var manifest = [],
            key,
            queue = new createjs.LoadQueue();

        queue.addEventListener("complete", $.proxy(options.onComplete, this));

        for (key in options.images) {
            if (options.images.hasOwnProperty(key)) {
                manifest.push({
                    'id': key,
                    'src' : options.images[key]
                });
            }
        }
        queue.loadManifest(manifest);
        return queue;
    };


    return {
        'preloadImages' : preloadImages
    }
});