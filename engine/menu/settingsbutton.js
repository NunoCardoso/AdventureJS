/*global define, createjs, $ */

/**
 * This is the main button on the corner of the scenes
 */
define([
    'engine/menu/settingspanel'
], function (
    SettingsPanel
) {
    var SettingsButton = function (options) {
        this.initialize(options);
    };

    SettingsButton.prototype = new createjs.Shape();
    SettingsButton.prototype.SettingsButton_initialize = SettingsButton.prototype.initialize;
    SettingsButton.prototype.initialize = function (options) {
        this.panel = undefined;
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

        this.openPanel = function (e) {
            var stage = require('engine/stage/main').getInstance();
            if (!stage.getChildByName('settings')) {
                this.panel = new SettingsPanel();
                this.panel.show();
                stage.addChild(this.panel);
            }
        };

        this.closePanel = function () {
            var stage = require('engine/stage/main').getInstance();
            this.panel.hide();
            stage.removeChild(this.panel);
            this.panel = undefined;
        };

        this.addEventListener("click", $.proxy(this.openPanel, this));

        this.addEventListener("mouseover", $.proxy(function (e) {
            this.alpha = 1;
        }, this));

        this.addEventListener("mouseout", $.proxy(function (e) {
            this.alpha = 0.5;
        }, this));
    };
    return SettingsButton;
});