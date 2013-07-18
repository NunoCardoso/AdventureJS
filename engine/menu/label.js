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

    StartButtonLabel.prototype = new createjs.Text('', "bold 24px the8bit", "#FFFFFF");
    StartButtonLabel.prototype.StartButtonLabel_initialize = StartButtonLabel.prototype.initialize;
    StartButtonLabel.prototype.initialize = function (options) {
        this.textAlign = "center";
        this.textBaseline = "middle";
        this.text = options.text;
        this.x = options.x;
        this.y = options.y;
    };
    return StartButtonLabel;
});