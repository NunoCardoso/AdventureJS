/*global define, createjs, $ */

/**
 * This module is an arrow up class
 */
define([
    'engine/lib/assets'
], function (
    assets
) {
    var ArrowUp = function (options) {
        this.initialize(options);
    };

    var p = ArrowUp.prototype = new createjs.Container();
    p.ArrowUp_initialize = p.initialize;
    p.initialize = function (options) {
        this.ArrowUp_initialize();

        this.x = options.x;
        this.y = options.y;
        this.w = options.w;
        this.h = options.h;

        this.image = new createjs.Bitmap();
        this.background = new createjs.Shape();

        this.image.image = assets.getQueueLoaded().getResult('image.panel.arrowup');
        this.image.scaleX = 40 / this.image.image.width;
        this.image.scaleY = 90 / this.image.image.height;
        this.isMouseOver = false;

        this.addChild(
            this.image,
            this.background
        );

        this.background.graphics
            .beginStroke("#880000")
            .beginFill("blue")
            .drawRect(0, 0, this.w, this.h);
        this.background.alpha = 0.15;

        this.testClick = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseClick = this.hitTest(coords.x, coords.y);
            if (mouseClick) {
                this.parent.firstRow--;
                this.parent.render();
                return true;
            }
            return false;
        };

        this.testHit = function (x, y) {
            var coords = this.globalToLocal(x, y);
            var mouseOver = this.hitTest(coords.x, coords.y);
            if (mouseOver && !this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.background.alpha = 0.3;
            }
            if (!mouseOver && this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.background.alpha = 0.15;
            }
        };
    };

    return ArrowUp;
});
