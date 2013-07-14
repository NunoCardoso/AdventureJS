/*global define, createjs, $ */

/**
 * This is the
 */
define([
    'engine/gameconfig',
    'engine/gamestage',
    'engine/gamescene',
    'engine/assets',
    'engine/start/background',
    'engine/start/progressbar',
    'engine/start/progressbarbackground',
    'engine/start/loadedfile',
    'engine/start/loadingtext'
], function (
    gameconfig,
    gamestage,
    GameScene,
    assets,
    Background,
    ProgressBar,
    ProgressBarBackground,
    LoadedFile,
    LoadingText
) {
    var init = function (options) {
   // start Background
        var background = new Background({
                x: 0,
                y: 0,
                w: gameconfig.get('game.w'),
                h: gameconfig.get('game.h')
            }),

            progressBar = new ProgressBar({
                'total' : options.assetList.length,
                'color' : 'red'
            }),

            progressBarBackground = new ProgressBarBackground(),
            loadedFile = new LoadedFile(),
            loadingText = new LoadingText(),
            startScene = new GameScene({name: "container.start"});

        startScene.addChild(
            background,
            progressBarBackground,
            progressBar,
            loadedFile,
            loadingText
        );

        gamestage.addChild(startScene);
        gamestage.update();

        assets.preload({
            assetList  : options.assetList,
            onComplete : options.onAssetsLoaded,
            loadedFile : loadedFile,
            progressBar: progressBar
        });
    };

    return {
        'init' : init
    };

});