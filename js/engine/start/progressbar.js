/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/gameconfig'
], function (
    gameconfig
) {
    var ProgressBar = function (options) {
        this.initialize(options);
    };

    ProgressBar.prototype = new createjs.Shape();

    ProgressBar.prototype.ProgressBar_initialize = ProgressBar.prototype.initialize;
    ProgressBar.prototype.initialize = function (options) {
        this.ProgressBar_initialize();

        this.total = options.total;
        this.loaded = 0;
        this.color = options.color;

        this.render = function () {
            this.graphics
                .beginStroke("white")
                .beginFill(this.color)
                .drawRect(
                    this.x,
                    this.y,
                    this.w,
                    this.h
                );
        };

        this.add = function () {
            this.loaded++;
            this.w = (this.loaded / this.total) * gameconfig.get('progressbar.w');
            this.render();
        };

        this.x = gameconfig.get('progressbar.x') / 2;
        this.y = gameconfig.get('progressbar.y') / 2;
        this.h = gameconfig.get('progressbar.h');
        this.w = parseInt(((this.loaded * gameconfig.get('progressbar.w')) / this.total), 10);
        this.w = this.w / 2;
        this.render();
    };

    return ProgressBar;
});