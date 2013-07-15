/*global define */

/**
 * This is the
 */
define([
    'engine/lib/assets',
    'engine/scene/scene',
    'engine/stage/main',
    'engine/start/background',
    'engine/start/loadedfile',
    'engine/start/loadingtext',
    'engine/start/progressbar',
    'engine/start/progressbarbackground'
], function (
    assets,
    GameScene,
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
            startScene  = new GameScene({id: "start"}); // scene mane is 'scene.start'

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