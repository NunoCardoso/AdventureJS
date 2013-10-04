/*global define, createjs, $ */

/**
 * This module is an arrow up class
 */
define([
    'engine/lib/assets'
], function (
    assets
) {
    var ArrowDown = function (options) {
        this.initialize(options);
    };

    var p = ArrowDown.prototype = new createjs.Container();
    p.ArrowDown_initialize = p.initialize;
    p.initialize = function (options) {
        this.ArrowDown_initialize();

        this.x = options.x;
        this.y = options.y;
        this.w = options.w;
        this.h = options.h;

        this.image = new createjs.Bitmap();
        this.background = new createjs.Shape();

        this.image.image = assets.getQueueLoaded().getResult('image.panel.arrowdown');
        this.image.scaleX = 35 / this.image.image.width;
        this.image.scaleY = 80 / this.image.image.height;

        this.isMouseOver = false;

        this.addChild(
            this.background,
            this.image
        );

        this.background.graphics
            .beginFill("#91765A")
            .drawRect(2, 0, this.w + 2, this.h);
        this.background.alpha = 0.01;

        this.test = function (x, y, event, scene, role) {
            var coords = this.globalToLocal(x, y),
                mine   = this.hitTest(coords.x, coords.y);
            switch (event) {
            case 'click':
                if (mine) {
                    this.parent.firstRow++;
                    this.parent.render();
                    return true;
                }
                return false;
            case 'hover':
                if (mine && !this.isMouseOver) {
                    this.isMouseOver = mine;
                    this.background.alpha = 1;
                    return true;
                }
                if (!mine && this.isMouseOver) {
                    this.isMouseOver = mine;
                    this.background.alpha = 0.01;
                    return true;
                }
                return false;
            default:
                return false;
            }
        };
    };

    return ArrowDown;
});
