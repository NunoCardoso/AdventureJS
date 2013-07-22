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

    GameDialogOption.prototype = new createjs.Text();
    GameDialogOption.prototype.GameDialogOption_initialize = GameDialogOption.prototype.initialize;
    GameDialogOption.prototype.initialize = function (options) {

        this.GameDialogOption_initialize();
        this.text = options.text;
        this.font = "24px the8bit";
        this.color = "#FFFFFF";
        this.textAlign = "left";
        this.textBaseline = "top";
        this.alpha = 0.7;
        this.x = options.x;
        this.y = options.y;
        this.pc = options.pc;
        this.npc = options.npc;

        // the dialog to trigger on click;
        this.dialog = options.dialog;

        // hovering on text sucks. Let's add a flat hit area!
        var hitArea = new createjs.Shape();
        hitArea.graphics.beginFill("red")
            .drawRect(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
        this.hitArea = hitArea;

        this.addEventListener('mouseover', $.proxy(function () {
            this.alpha = 1;
        }, this));

        this.addEventListener('mouseout',  $.proxy(function () {
            this.alpha = 0.7;
        }, this));

        this.addEventListener('click', $.proxy(function (e) {
            var gamedialog = require('engine/dialog/main');
            var dia = gamedialog.get(this.dialog);
            gamedialog.perform({
                lines : dia.lines.slice(0),
                pc    : this.pc,
                npc   : this.npc,
                onEnd : dia.onEnd
            });
        }, this));
    };
    return GameDialogOption;
});