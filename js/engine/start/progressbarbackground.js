/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/gameconfig'
], function (
    gameconfig
) {
    var ProgressBarBackground = function (boundaries) {
        this.initialize(boundaries);
    };

    ProgressBarBackground.prototype = new createjs.Shape();
    ProgressBarBackground.prototype.ProgressBarBackground_initialize = ProgressBarBackground.prototype.initialize;
    ProgressBarBackground.prototype.initialize = function (boundaries) {
        this.ProgressBarBackground_initialize();
        this.name = "background.progressbar.background";
        this.graphics.beginFill("white")
            .drawRect(
                gameconfig.get('progressbar.x'),
                gameconfig.get('progressbar.y'),
                gameconfig.get('progressbar.w'),
                gameconfig.get('progressbar.h')
            );
    };
    return ProgressBarBackground;
});
