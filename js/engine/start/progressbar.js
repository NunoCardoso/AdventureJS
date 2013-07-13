/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([], function () {
    var ProgressBar = function (boundaries, color) {
        this.initialize(boundaries, color);
    };

    ProgressBar.prototype = new createjs.Shape();

    ProgressBar.prototype.ProgressBar_initialize = ProgressBar.prototype.initialize;
    ProgressBar.prototype.initialize = function (boundaries, color) {
        this.ProgressBar_initialize();
        this.graphics.beginFill(color)
            .drawRoundRect(
                boundaries.x,
                boundaries.y,
                boundaries.w,
                boundaries.h,
                0
            );
    };
    return ProgressBar;
});