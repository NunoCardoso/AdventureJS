/*global define, createjs, $ */

/**
 * This is the console's Sentence class
 */
define([
    'engine/gameconfig',
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
        this.selectedVerbSecond = false;
        this.selectedObject = false;

        this.decideAction = function () {
            // ok, action is goind to be performed , let's reset the sentence
            var textToSay = this.getDefaultText();

            this.selectedVerb = false;
            this.selectedVerbSecond = false;
            this.selectedObject = false;

            return {
                'action' : 'say',
                'text'   : textToSay
            };
        };

        this.getDefaultText = function () {
            var text = '';
            if (!this.selectedVerb) {
                return this.defaultText;
            }
            text = this.selectedVerb.text;
            if (!this.selectedObject) {
                return text;
            }
            text += ' ' + this.selectedObject.label;
            if (!this.selectedVerbSecond) {
                return text;
            }
            text += ' ' + this.selectedVerbSecond;
            return text;
        };

        this.setVerb = function (verb) {
            this.selectedVerb = verb;
            this.text = verb.text;
        };

        this.displayVerb = function (verb) {
            this.text = verb.text;
        };

        this.undisplayVerb = function () {
            this.text = this.getDefaultText();
        };

        this.clearVerb = function () {
            this.selectedVerb = false;
        };

        // setting an object can imply an action.
        // return it so that the playable character can do something.
        this.setObject = function (object) {
            this.selectedObject = object;

            // if verb cardinality is 1, do something.
            if (this.selectedVerb.nr === 1) {
                return this.decideAction();
            }
            if (this.selectedVerb.nr === 2) {
                this.selectedVerbSecond = this.selectedVerb.second;
                this.text = this.text + ' ' + this.selectedVerb.second;
                return undefined;
            }
        };

        this.displayObject = function (verb) {
            this.text = (this.selectedVerb ? this.selectedVerb.text : this.defaultText)
                + ' ' + verb.label;
        };

        this.undisplayObject = function () {
            this.text = this.getDefaultText();
        };

        this.clearObject = function () {
            this.selectedObject = false;
        };
    };
    return Sentence;
});