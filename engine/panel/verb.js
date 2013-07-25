/*global define, createjs, $ */

/**
 * This is the pane's Verb class
 */
define([
    'engine/interaction/action',
], function (
    action
) {
    var Verb = function (options) {
        this.initialize(options);
    };

    var p = Verb.prototype = new createjs.Text();
    p.Text_initialize = p.initialize;
    p.initialize = function (options) {
        this.Text_initialize();

        this.name = 'panel.verb.' + options.text;
        this.text = options.text;
        this.font = "28px the8bit";
        this.color = "#FFFFFF";
        this.textAlign = "left";
        this.textBaseline = "middle";
        this.alpha = 0.7;
        this.x = options.x;
        this.y = options.y;
        this.nr = options.nr;
        this.second = options.second;

        this.isMouseOver = false;

        // hovering on text sucks. Let's add a flat hit area!
        var hitArea = new createjs.Shape();
        hitArea.graphics.beginFill("red")
            .drawRect(-10, -30, options.w, options.h);
        this.hitArea = hitArea;

        this.testClick = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseClick = this.hitTest(coords.x, coords.y);
            if (mouseClick) {
                createjs.Sound.play('sound.fall');
                action.clickVerb(this);

            }
        };

        this.testHit = function (x, y) {
            var coords = this.globalToLocal(x, y);
            var mouseOver = this.hitTest(coords.x, coords.y);
            if (mouseOver && !this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.alpha = 1;
                return action.mouseOverVerb({target: this});
            }

            if (!mouseOver && this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.alpha = 0.7;
                return action.mouseOutVerb({target: this});
            }
        };
    };
    return Verb;
});
