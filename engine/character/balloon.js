/*global define, createjs, $ */

/**
 * This is the balloon over character heads
 */
define([
    'engine/config'
], function (
    config
) {
    var Balloon = function (options) {
        this.initialize(options);
    };

    var p = Balloon.prototype = new createjs.Container();
    p.Balloon_initialize = p.initialize;
    p.initialize = function (options) {
        this.Balloon_initialize();

        this.line = new createjs.Text();
        this.balloon = new createjs.Shape();
        this.tooltip = new createjs.Shape();

        this.addChild(this.tooltip);
        this.addChild(this.balloon);
        this.addChild(this.line);

        this.x = 0;
        this.y = 0;

        this.line.text = options.text || "";
        this.line.font = options.font || "bold 24px the8bit";
        this.line.color = options.textColor || "#000000";
        this.line.textAlign = "center";
        this.line.textBaseline = "top";

        this.line.lineWidth = 250;
        this.balloon.alpha = 1;

        this.drawTooltip = function () {
            var x = this.line.x - this.line.regX,
                y = this.line.y + this.line.getMeasuredHeight();

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

            this.balloon.x = 0;
            this.balloon.y = -10;
            this.balloon.w = this.line.lineWidth + 10; // 10 is padding left + padding right
            this.balloon.h = this.line.getMeasuredHeight() + 10; // 10 is padding left + padding right

            this.regX = this.balloon.w / 2;
            this.regY = this.balloon.h;

            this.line.x = 0;
            this.line.y = -2; // little padding
            this.line.regX = -this.line.lineWidth / 2;

            this.balloon.graphics
                .s("#DDDDDD")
                .f("#FFFFFF")
                .rr(
                    0,
                    0,
                    this.balloon.w,
                    this.balloon.h,
                    10
                );
        };

        this.setX = function (x) {
            this.x = x;
        };

        this.setY = function (y) {
            this.y = y;
        };

        this.say = function (text) {
            this.line.text = text;
            this.drawBalloon();
            this.drawTooltip();
        };

        this.shutUp = function () {
            this.line.text = '';
            this.balloon.graphics.clear();
            this.tooltip.graphics.clear();
        };
    };
    return Balloon;
});