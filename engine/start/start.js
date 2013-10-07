/*global define, createjs, $ */

/**
 * This is the start main
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

    var GameStart = function (options) {
        this.initialize(options);
    };

    var p = GameStart.prototype = new createjs.Container();
    p.GameStart_initialize = p.initialize;
    p.initialize = function (options) {
        this.GameStart_initialize();

        this.background  = new Background();

        this.progressBar = new ProgressBar({
            'total' : options.assetList.length
        });
        this.name = 'scene.start';
        this.progressBarBackground = new ProgressBarBackground();
        this.loadedFile  = new LoadedFile();
        this.loadingText = new LoadingText();

        this.addChild(
            this.background,
            this.progressBarBackground,
            this.progressBar,
            this.loadedFile,
            this.loadingText
        );

        this.loadAssets = function () {
            var d = $.Deferred();
            assets.preload({
                assetList  : options.assetList,
                onComplete : function (queue) {
                    assets.setQueueLoaded(queue.target);
                    d.resolve();
                },
                loadedFile : this.loadedFile,
                progressBar: this.progressBar
            });

            return d.promise();
        };

        this.fadeOut = function () {
            var self = this;
            var gamestage = require('engine/stage/main').get();
            this.alpha = 1;
            var d = $.Deferred();

            var inter = setInterval(function () {
                self.alpha -= 0.1;
                gamestage.update();
                if (self.alpha < 0.05) {
                    clearInterval(inter);
                    d.resolve();
                }
            }, 50);
            return d;
        };
    };
    return GameStart;
});