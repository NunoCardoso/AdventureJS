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

        this.test = function (x, y, event, scene, role) {
            var coords = this.globalToLocal(x, y),
                mine   = this.hitTest(coords.x, coords.y);
            switch (event) {
            case 'click':
                if (mine) {
                    require('engine/game/music').playSound('sound.fall');
                    require('engine/interaction/action').clickVerb(this);
                    return true;
                }
                return false;
            case 'hover':
                if (mine && !this.isMouseOver) {
                    this.isMouseOver = mine;
                    this.text.alpha = 1;
                    this.background.alpha = 0.3;
                    return require('engine/interaction/action').mouseOverVerb(this);
                }
                if (!mine && this.isMouseOver) {
                    this.isMouseOver = mine;
                    this.text.alpha = 0.7;
                    this.background.alpha = 0.15;
                    return require('engine/interaction/action').mouseOutVerb(this);
                }
                return false;
            default:
                return false;
            }
        };
    };
    return Verb;
});
