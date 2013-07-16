/*global define, createjs, $ */

/**
 * This is the speech line over character heads
 */
define([
], function (
) {
    var TextLine = function (options) {
        this.initialize(options);
    };

    TextLine.prototype = new createjs.Text();
    TextLine.prototype.TextLine_initialize = TextLine.prototype.initialize;
    TextLine.prototype.initialize = function (options) {

        this.text = options.text || "";
        this.font = options.font || "bold 24px the8bit";
        this.color = options.color || "#FFFFFF";
        this.textAlign = "center";
        this.textBaseline = "bottom";
        this.x = options.x;
        this.y = options.y;

        this.setX = function (x) {
            this.x = x;
        };

        this.setY = function (y) {
            this.y = y;
        };

        this.say = function (text) {
            this.text = text;
        };

        this.unsay = function () {
            this.text = '';
        };
    };
    return TextLine;
});