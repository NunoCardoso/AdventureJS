/*global define, createjs, $ */

/**
 * This is the console's Sentence class
 */
define([
    'engine/gameconfig'
], function (
    gameconfig
) {
    var Sentence = function () {
        this.initialize();
    };

    Sentence.prototype = new createjs.Text();
    Sentence.prototype.Sentence_initialize = Sentence.prototype.initialize;
    Sentence.prototype.initialize = function () {

        this.Sentence_initialize();
        this.defaultText = gameconfig.get('console.sentence.defaultText');
        this.name = 'console.sentence';
        this.text = this.defaultText;
        this.font = "20px the8bit";
        this.color = "#FFFFFF";
        this.textAlign = "center";
        this.textBaseline = "top";
        this.x = gameconfig.get('console.w') / 2;
        this.y = gameconfig.get('console.y');
        this.selectedVerb = false;
        this.selectedObject = false;

        this.setVerb = function (verb) {
            this.selectedVerb = verb;
        };

        this.clearVerb = function () {
            this.selectedVerb = false;
        };

        this.setObject = function (object) {
            this.selectedObject = object;
        };

        this.clearObject = function () {
            this.selectedObject = false;
        };
    };
    return Sentence;
});