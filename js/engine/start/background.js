/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([], function () {
    var Background = function (boundaries) {
        this.initialize(boundaries);
    };

    Background.prototype = new createjs.Shape();
    Background.prototype.Background_initialize = Background.prototype.initialize;
    Background.prototype.initialize = function (boundaries) {
        this.Background_initialize();
        this.name = "background.start";
        this.graphics.beginFill("black")
            .drawRoundRect(
                boundaries.x,
                boundaries.y,
                boundaries.w,
                boundaries.h,
                0
            );
    };
    return Background;
});
