/*global define, createjs, $ */

/**
 * This is the pane's Verb class
 */
define([
    'engine/interaction/action'
], function (
    action
) {
    var GameDialogOption = function (options) {
        this.initialize(options);
    };

    var p = GameDialogOption.prototype = new createjs.Container();
    p.GameDialogOption_initialize = p.initialize;
    p.initialize = function (options) {
        this.GameDialogOption_initialize();

        this.x     = options.x;
        this.y     = options.y;

        this.text = new createjs.Text();
        this.text.text  = options.text;
        this.text.font  = "24px the8bit";
        this.text.color = "#FFFFFF";
        this.text.textAlign    = "left";
        this.text.textBaseline = "top";
        this.text.alpha = 0.7;

        this.background = new createjs.Shape();
        this.background.x = 0;
        this.background.y = 0;
        this.background.graphics
            .beginStroke("#880000")
            .beginFill("blue")
            .drawRect(0, 0, this.text.getMeasuredWidth(), this.text.getMeasuredHeight());
        this.background.alpha = 0.15;

        this.addChild(
            this.background,
            this.text
        );

        this.pc    = options.pc;
        this.npc   = options.npc;
        // the dialog to trigger on click;
        this.dialog = options.dialog;
        this.isMouseOver = false;

        // hovering on text sucks. Let's add a flat hit area!
        this.testClick = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseClick = this.hitTest(coords.x, coords.y);
            if (mouseClick) {
                var gamedialog = require('engine/dialog/main'),
                    dialog = gamedialog.get(this.dialog);

                gamedialog.perform({
                    lines : dialog.lines.slice(0),
                    pc    : this.pc,
                    npc   : this.npc,
                    onEnd : dialog.onEnd
                });
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
                return true;
            }
            if (!mouseOver && this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.text.alpha = 0.7;
                this.background.alpha = 0.15;
                return true;
            }
            return false;
        };
    };
    return GameDialogOption;
});
