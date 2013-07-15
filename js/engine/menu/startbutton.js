/*global define, createjs, $ */

/**
 * This is the start button on the game menu
 */
define([
    'engine/config',
    'engine/stage/main'
], function (
    config,
    gamestage
) {
    var StartButton = function (options) {
        this.initialize(options);
    };

    StartButton.prototype = new createjs.Shape();
    StartButton.prototype.StartButton_initialize = StartButton.prototype.initialize;
    StartButton.prototype.initialize = function (options) {
        this.alpha = 0.5;
        this.nextScene = options.to;
        this.graphics
            .beginStroke("#880000")
            .beginFill("red")
            .drawRoundRect(
                config.get('startbutton.x'),
                config.get('startbutton.y'),
                config.get('startbutton.w'),
                config.get('startbutton.h'),
                config.get('startbutton.r')
            );

        this.addEventListener("click", $.proxy(function (e) {
            gamestage.getInstance().switchScene(
                'scene.menu',
                'scene.' + this.nextScene
            );
        }, this));

        this.addEventListener("mouseover", $.proxy(function (e) {
            this.alpha = 1;
        }, this));

        this.addEventListener("mouseout", $.proxy(function (e) {
            this.alpha = 0.5;
        }, this));

    };
    return StartButton;
});