/*global define */

/**
 * This is the
 */
define([
    'engine/lib/assets',
    'engine/scene/main',
    'engine/stage/main',
    'engine/start/background',
    'engine/start/loadedfile',
    'engine/start/loadingtext',
    'engine/start/progressbar',
    'engine/start/progressbarbackground'
], function (
    assets,
    gamescene,
    gamestage,
    Background,
    LoadedFile,
    LoadingText,
    ProgressBar,
    ProgressBarBackground
) {
    var init = function (options) {

        var background  = new Background(),
            progressBar = new ProgressBar({
                'total' : options.assetList.length
            }),
            progressBarBackground = new ProgressBarBackground(),
            loadedFile  = new LoadedFile(),
            loadingText = new LoadingText(),
            startScene  = gamescene.newScene({id: "start"}); // scene name is 'scene.start'

        startScene.addChild(
            background,
            progressBarBackground,
            progressBar,
            loadedFile,
            loadingText
        );

        gamestage.getInstance().addChild(startScene);
        gamestage.getInstance().update();

        assets.preload({
            assetList  : options.assetList,
            onComplete : function (queue) {
                console.log('Assets loaded');
                assets.setQueueLoaded(queue.target);
                options.onAssetsLoaded.call();
            },
            loadedFile : loadedFile,
            progressBar: progressBar
        });
    };

    return {
        'init' : init
    };

});