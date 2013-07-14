/*global Graphics, define, createjs, $ */

/**
 * This is the 
 */
define([
    'engine/gameconfig'
], function (
    gameconfig
) {
    var StartButton = function (options) {
        this.initialize(options);
    };

    StartButton.prototype = new createjs.Shape();
    StartButton.prototype.StartButton_initialize = StartButton.prototype.initialize;
    StartButton.prototype.initialize = function (options) {
        this.name = "startButton";
        this.alpha = 0.5;
        this.graphics
            .beginStroke("#880000")
            .beginFill("red")
            .drawRoundRect(
                gameconfig.get('startbutton.x'),
                gameconfig.get('startbutton.y'),
                gameconfig.get('startbutton.w'),
                gameconfig.get('startbutton.h'),
                gameconfig.get('startbutton.r')
            );
        this.addEventListener("mouseover", $.proxy(function (e) {
            this.alpha = 1;
        }, this));

        this.addEventListener("mouseout", $.proxy(function (e) {
            this.alpha = 0.5;
        }, this));

    };
    return StartButton;
});