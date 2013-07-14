/*global define, createjs, $ */

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
        this.graphics.beginFill("red")
            .drawRoundRect(
                gameconfig.get('startbutton.x'),
                gameconfig.get('startbutton.y'),
                gameconfig.get('startbutton.w'),
                gameconfig.get('startbutton.h'),
                gameconfig.get('startbutton.r')
            );
    };
    return StartButton;
});