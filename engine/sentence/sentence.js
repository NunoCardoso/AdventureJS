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

    var p = Sentence.prototype = new createjs.Text();
    p.Sentence_initialize = p.initialize;
    p.initialize = function () {
        this.Sentence_initialize();

        this.text  = '';
        this.font  = "24px the8bit";
        this.color = "#FFFFFF";
        this.textAlign    = "center";
        this.textBaseline = "top";
        this.x = config.get('panel.w') / 2 + 7;
        this.y = config.get('panel.y');
    };
    return Sentence;
});