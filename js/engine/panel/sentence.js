/*global define, createjs, $ */

/**
 * This is the panel's Sentence class
 */
define([
    'engine/config',
], function (
    config
) {
    var Sentence = function () {
        this.initialize();
    };

    Sentence.prototype = new createjs.Text();
    Sentence.prototype.Sentence_initialize = Sentence.prototype.initialize;
    Sentence.prototype.initialize = function () {

        this.Sentence_initialize();
        this.name = 'panel.sentence';
        this.text = this.defaultText;
        this.font = "20px the8bit";
        this.color = "#FFFFFF";
        this.textAlign = "center";
        this.textBaseline = "top";
        this.x = config.get('panel.w') / 2;
        this.y = config.get('panel.y');
    };
    return Sentence;
});