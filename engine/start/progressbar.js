/*global define, createjs */

/**
 * This module displays a progres bar
 */
define([
    'engine/config',
    'engine/stage/main',
], function (
    config,
    gamestage
) {
    var ProgressBar = function (options) {
        this.initialize(options);
    };

    ProgressBar.prototype = new createjs.Shape();
    ProgressBar.prototype.ProgressBar_initialize = ProgressBar.prototype.initialize;
    ProgressBar.prototype.initialize = function (options) {

        this.ProgressBar_initialize();
        this.total  = options.total;
        this.loaded = 0;

        this.render = function () {
            this.graphics.clear();
            this.graphics
                .beginStroke("white")
                .beginFill("red")
                .drawRect(
                    this.x,
                    this.y,
                    this.w,
                    this.h
                );
        };

        this.add = function () {
            this.loaded++;
            this.w = (this.loaded / this.total) * config.get('progressbar.w');
            this.render();
            gamestage.getInstance().update();
        };

        this.x = config.get('progressbar.x') / 2;
        this.y = config.get('progressbar.y') / 2;
        this.h = config.get('progressbar.h');
        this.w = parseInt(((this.loaded * config.get('progressbar.w')) / this.total), 10);
        this.w = this.w / 2;
        this.render();
    };

    return ProgressBar;
});