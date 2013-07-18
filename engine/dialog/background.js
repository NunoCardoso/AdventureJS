/*global define, createjs, $ */

/**
 * This module handles dialog panel background
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
        this.name = "dialog.panel.background";
        this.graphics.beginFill("black")
            .drawRect(
                config.get('panel.x'),
                config.get('panel.y'),
                config.get('panel.w'),
                config.get('panel.h')
            );
    };
    return Background;
});
