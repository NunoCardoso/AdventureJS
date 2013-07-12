/*global define, createjs, $ */

/**
 * This is the console's Verb class
 */
define([], function () {
    var Verb = function (options) {
        this.initialize(options);
    };

    Verb.prototype = new createjs.Text();
    Verb.prototype.Text_initialize = Verb.prototype.initialize;
    Verb.prototype.initialize = function (options) {
        this.Text_initialize();
        this.name = 'console.verb.' + options.text;
        this.text = options.text;
        this.font = "28px the8bit";
        this.color = "#FFFFFF";
        this.textAlign = "left";
        this.textBaseline = "middle";
        this.alpha = 0.7;
        this.x = options.x;
        this.y = options.y;

        // hovering on text sucks. Let's add a flat hit area!
 /*       var hitArea = new createjs.Shape();
        hitArea.graphics.beginFill("red")
            .drawRect(-10, -30, options.w, options.h);
        this.hitArea = hitArea;
    */};
    return Verb;
});
