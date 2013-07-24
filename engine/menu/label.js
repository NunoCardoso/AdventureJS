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

    var p = StartButtonLabel.prototype = new createjs.Text();
    p.StartButtonLabel_initialize = p.initialize;
    p.initialize = function (options) {
        this.StartButtonLabel_initialize();

        this.text = options.text;
        this.font = "bold 24px the8bit";
        this.color = "#FFFFFF";
        this.textAlign = "center";
        this.textBaseline = "middle";
        this.x    = options.x;
        this.y    = options.y;
    };
    return StartButtonLabel;
});