/*global define, createjs, $ */

/**
 * This is the main button on the corner of the scenes
 */
define([
], function (
) {
    var SettingsButton = function (options) {
        this.initialize(options);
    };

    SettingsButton.prototype = new createjs.Shape();
    SettingsButton.prototype.SettingsButton_initialize = SettingsButton.prototype.initialize;
    SettingsButton.prototype.initialize = function (options) {
        this.alpha = 0.7;
        this.graphics
            .beginStroke("#FFFFFF")
            .beginFill("#DDDDDD")
            .drawRoundRect(
                10,
                10,
                100,
                30,
                10
            );

        this.addEventListener("click", $.proxy(function (e) {
            
        }, this));

        this.addEventListener("mouseover", $.proxy(function (e) {
            this.alpha = 1;
        }, this));

        this.addEventListener("mouseout", $.proxy(function (e) {
            this.alpha = 0.5;
        }, this));
    };
    return SettingsButton;
});