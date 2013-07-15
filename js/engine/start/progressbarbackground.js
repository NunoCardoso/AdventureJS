/*global define, createjs */

/**
 * This module renders the progress bar background
 */
define([
    'engine/config'
], function (
    config
) {
    var ProgressBarBackground = function (boundaries) {
        this.initialize(boundaries);
    };

    ProgressBarBackground.prototype = new createjs.Shape();
    ProgressBarBackground.prototype.ProgressBarBackground_initialize = ProgressBarBackground.prototype.initialize;
    ProgressBarBackground.prototype.initialize = function (boundaries) {
        this.ProgressBarBackground_initialize();
        this.graphics.beginFill("white")
            .drawRect(
                config.get('progressbar.x'),
                config.get('progressbar.y'),
                config.get('progressbar.w'),
                config.get('progressbar.h')
            );
    };
    return ProgressBarBackground;
});
