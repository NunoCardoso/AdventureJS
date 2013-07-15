/*global define, createjs, $ */

/**
 * This module handles console background
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
        this.name = "background.console";
        this.graphics.beginFill("black")
            .drawRect(
                config.get('console.x'),
                config.get('console.y'),
                config.get('console.w'),
                config.get('console.h')
            );
    };
    return Background;
});
