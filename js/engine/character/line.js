/*global define, createjs, $ */

/**
 * This is the speech line over character heads
 */
define([
    'engine/config'
], function (
    config
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
        this.textBaseline = "top";
        this.referenceX = options.x;
        this.referenceY = options.y;
        this.x = options.x;
        this.y = options.y;

        this.shadow = new createjs.Shadow("#000000", 0, 0, 10);
        this.lineWidth = 250;

        this.setX = function (x) {
            this.referenceX = x;
            this.x = x;
        };

        this.setY = function (y) {
            this.referenceY = y;
            this.y = y;
        };

        this.say = function (text) {
            this.text = text;
            // move text a little above so it can fit
            var calculatedX =  this.getMeasuredWidth();
            // check if it is out of bounds
            if (this.x - (calculatedX / 2) < 0) {
                this.x = calculatedX / 2 + 1;
            }
            if (this.x + (calculatedX / 2) > config.get('game.w')) {
                this.x = config.get('game.w') - calculatedX / 2 - 1;
            }
            this.y = this.referenceY - this.getMeasuredHeight();
        };

        this.shutUp = function () {
            this.text = '';
        };
    };
    return TextLine;
});