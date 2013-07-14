/*global define, createjs, $ */

/**
 * This is the 
 */
define([
    'engine/gameconfig'
], function (
    gameconfig
) {
    var StartButtonLabel = function (options) {
        this.initialize(options);
    };

    StartButtonLabel.prototype = new createjs.Text("start game!", "bold 24px the8bit", "#FFFFFF");
    StartButtonLabel.prototype.StartButtonLabel_initialize = StartButtonLabel.prototype.initialize;
    StartButtonLabel.prototype.initialize = function (options) {
        this.name = "StartButtonLabel";
        this.textAlign = "center";
        this.textBaseline = "middle";
        this.x = gameconfig.get('game.w') / 2;
        this.y = gameconfig.get('startbutton.y') + gameconfig.get('startbutton.h') / 2;
    };
    return StartButtonLabel;
});