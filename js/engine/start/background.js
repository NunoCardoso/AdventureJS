/*global define, createjs */

/**
 * This module initializes the start background, all black
 */
define([
    'engine/config'
], function (
    config
) {
    var Background = function () {
        this.initialize();
    };

    Background.prototype = new createjs.Shape();
    Background.prototype.Background_initialize = Background.prototype.initialize;
    Background.prototype.initialize = function () {
        this.Background_initialize();
        this.graphics.beginFill("black")
            .drawRect(
                0,
                0,
                config.getCanvasXY().x,
                config.getCanvasXY().y
            );
    };
    return Background;
});
