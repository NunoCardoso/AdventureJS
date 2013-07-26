/*global define, createjs, $ */

/**
 * This is the pane's Verb class
 */
define([
], function (
) {
    var Verb = function (options) {
        this.initialize(options);
    };

    var p = Verb.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.initialize = function (options) {
        this.Container_initialize();

        this.name = 'verb.' + options.text;

        this.x = options.x;
        this.y = options.y;
        this.w = options.w;
        this.h = options.h;

        this.text = new createjs.Text();
        this.background = new createjs.Shape();
        this.background.x = 0;
        this.background.y = 0;
        this.background.graphics
            .beginStroke("#880000")
            .beginFill("blue")
            .drawRect(0, 0, this.w, this.h);
        this.background.alpha = 0.15;

        this.addChild(
            this.background,
            this.text
        );

        this.text.text = options.text;
        this.text.font = "28px the8bit";
        this.text.color = "#FFFFFF";
        this.text.textAlign = "left";
        this.text.textBaseline = "middle";
        this.text.alpha = 0.7;

        // set text to middle of tile, and with left margin of 10;
        this.text.y = this.h / 2;
        this.text.x = 10;

        // verb logic
        this.nr = options.nr;
        this.second = options.second;

        this.isMouseOver = false;

        this.testClick = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseClick = this.hitTest(coords.x, coords.y);
            if (mouseClick) {
                createjs.Sound.play('sound.fall');
                require('engine/interaction/action').clickVerb(this);
                return true;
            }
            return false;
        };

        this.testHit = function (x, y) {
            var coords = this.globalToLocal(x, y);
            var mouseOver = this.hitTest(coords.x, coords.y);
            if (mouseOver && !this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.text.alpha = 1;
                this.background.alpha = 0.3;
                return require('engine/interaction/action').mouseOverVerb(this);
            }

            if (!mouseOver && this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.text.alpha = 0.7;
                this.background.alpha = 0.15;
                return require('engine/interaction/action').mouseOutVerb(this);
            }
        };
    };
    return Verb;
});
