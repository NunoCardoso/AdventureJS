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

    Verb.prototype = new createjs.Text();
    Verb.prototype.Text_initialize = Verb.prototype.initialize;
    Verb.prototype.initialize = function (options) {

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

        // hovering on text sucks. Let's add a flat hit area!
        var hitArea = new createjs.Shape();
        hitArea.graphics.beginFill("red")
            .drawRect(-10, -30, options.w, options.h);
        this.hitArea = hitArea;

        this.onVerbMouseOver = function (e) {
            // e.target is the verb
            e.target.alpha = 1;
            action.mouseOverVerb(e);
        };

        this.onVerbMouseOut = function (e) {
            // e.target is the verb
            e.target.alpha = 0.7;
            action.mouseOutVerb(e);
        };

        this.onVerbClick = function (e) {
            createjs.Sound.play('sound.fall');
            action.clickVerb(e);
        };

        this.addEventListener('mouseover', $.proxy(this.onVerbMouseOver, this));
        this.addEventListener('mouseout',  $.proxy(this.onVerbMouseOut, this));
        this.addEventListener('click',     $.proxy(this.onVerbClick, this));
    };
    return Verb;
});
