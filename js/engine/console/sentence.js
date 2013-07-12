/*global define, createjs, $ */

/**
 * This is the console's Sentence class
 */
define([], function () {
    var Sentence = function (text, boundaries) {
        this.initialize(text, boundaries);
    };

    Sentence.prototype = new createjs.Text();
    Sentence.prototype.Sentence_initialize = Sentence.prototype.initialize;
    Sentence.prototype.initialize = function (text, boundaries) {
        this.Sentence_initialize();
        this.name = 'console.sentence';
        this.text = text;
        this.font = "20px the8bit";
        this.color = "#FFFFFF";
        this.textAlign = "center";
        this.textBaseline = "top";
        this.x = boundaries.x;
        this.y = boundaries.y;
        // when mouse out on Sentences, if there is a locked Sentence (clicked previously),
        // do not remove it from action
        this.lockedVerb = false;
    };
    return Sentence;
});