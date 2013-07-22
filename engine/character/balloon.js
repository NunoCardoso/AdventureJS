/*global define, createjs, $ */

/**
 * This is the speech line over character heads
 */
define([
    'engine/config'
], function (
    config
) {
    var Balloon = function (options) {
        this.initialize(options);
    };

    Balloon.prototype = new createjs.Container();
    Balloon.prototype.Balloon_initialize = Balloon.prototype.initialize;
    Balloon.prototype.initialize = function (options) {

        this.line = new createjs.Text();
        this.line.text = options.text || "";
        this.line.font = options.font || "bold 24px the8bit";
        this.line.color = options.color || "#000000";
        this.line.textAlign = "center";
        this.line.textBaseline = "top";
        this.line.referenceX = options.x;
        this.line.referenceY = options.y;
        this.line.x = options.x;
        this.line.y = options.y;
        this.line.lineWidth = 250;


        this.balloon = new createjs.Shape();
        this.balloon.alpha = 1;

        this.tooltip = new createjs.Shape();

        this.drawTooltip = function () {
            var x = this.line.x,
                y = this.line.y + this.line.getMeasuredHeight() + 5;

            this.tooltip.graphics
                .s("#FFFFFF")
                .f("#FFFFFF")
                .mt(x - 20, y)
                .lt(x,      y + 20)
                .lt(x - 5,  y)
                .lt(x - 20, y)
                .cp();
        };

        this.drawBalloon = function () {
            this.balloon.x = this.line.x - this.line.lineWidth / 2 - 5; // 5px is padding
            this.balloon.y = this.line.y - 5;

            this.balloon.graphics
                .s("#DDDDDD")
                .f("#FFFFFF")
                .rr(
                    0,
                    0,
                    this.line.lineWidth + 10,
                    this.line.getMeasuredHeight() + 10,
                    10
                );
        };

        this.setX = function (x) {
            this.line.referenceX = x;
            this.line.x = x;
        };

        this.setY = function (y) {
            this.line.referenceY = y;
            this.line.y = y;
        };

        this.say = function (text) {
            this.line.text = text;

            // check if it is out of bounds
            if (this.line.x - (this.line.lineWidth / 2) < 0) {
                this.line.x = this.line.lineWidth / 2 + 1;
            }
            if (this.line.x + (this.line.lineWidth / 2) > config.get('game.w')) {
                this.line.x = config.get('game.w') - this.line.lineWidth / 2 - 1;
            }
            // give 30px margin for balloon padding and tooltip
            this.line.y = this.line.referenceY - this.line.getMeasuredHeight() - 30;

            this.drawBalloon();
            this.drawTooltip();
        };

        this.shutUp = function () {
            this.line.text = '';
            this.balloon.graphics.clear();
            this.tooltip.graphics.clear();
        };

        this.addChild(this.tooltip);
        this.addChild(this.balloon);
        this.addChild(this.line);
    };
    return Balloon;
});