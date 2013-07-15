/*global define, createjs */

/**
 * This is the start button label
 */
define([
    'engine/config'
], function (
    config
) {
    var StartButtonLabel = function (options) {
        this.initialize(options);
    };

    StartButtonLabel.prototype = new createjs.Text(config.get('startgame'), "bold 24px the8bit", "#FFFFFF");
    StartButtonLabel.prototype.StartButtonLabel_initialize = StartButtonLabel.prototype.initialize;
    StartButtonLabel.prototype.initialize = function (options) {
        this.textAlign = "center";
        this.textBaseline = "middle";
        this.x = config.get('game.w') / 2;
        this.y = config.get('startbutton.y') + config.get('startbutton.h') / 2;
    };
    return StartButtonLabel;
});