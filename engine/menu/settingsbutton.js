/*global define, createjs, $ */

/**
 * This is the main button on the corner of the scenes
 */
define([
    'engine/config',
    'engine/tpl/main',
    'engine/menu/label'
], function (
    config,
    gametemplate,
    Label
) {
    var SettingsButton = function (options) {
        this.initialize(options);
    };

    SettingsButton.prototype = new createjs.Container();
    SettingsButton.prototype.SettingsButton_initialize = SettingsButton.prototype.initialize;
    SettingsButton.prototype.initialize = function (options) {

        this.button = new createjs.Shape();
        this.button.alpha = 0.7;
        this.button.graphics
            .beginStroke("#FFFFFF")
            .beginFill("#888888")
            .drawRoundRect(
                10,
                10,
                100,
                30,
                10
            );

        this.label = new createjs.Text(config.get('settings'), 'bold 16px the8bit', '#222222');
        this.label.x = 15;
        this.label.y = 16;

        this.closePanel = function () {
            gametemplate.closeSettings();
        };

        this.addEventListener("click", function (e) {
            gametemplate.openSettings();
        });

        this.addEventListener("mouseover", function (e) {
            e.target.button.alpha = 1;
            require('engine/stage/main').update();
        });

        this.addEventListener("mouseout", function (e) {
            e.target.button.alpha = 0.5;
            require('engine/stage/main').update();
        });

        this.addChild(this.button);
        this.addChild(this.label);

    };
    return SettingsButton;
});