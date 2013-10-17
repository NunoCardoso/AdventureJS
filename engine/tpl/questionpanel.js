/*global document, define, createjs, $ */

/**
 * This is the scene description
 */
define([
    'engine/config'
], function (
    config
) {
    var QuestionPanel = function (options) {
        this.initialize(options);
    };

    QuestionPanel.prototype = new createjs.DOMElement(document.getElementById("forms"));
    QuestionPanel.prototype.QuestionPanel_initialize = QuestionPanel.prototype.initialize;
    QuestionPanel.prototype.initialize = function (options) {

        this.name = 'question';
        this.x = config.get('game.w') / 2 - 200; // width = 400
        this.y = config.get('game.h') / 2 - 30; // height = 60

        this.show = function () {
            $('#question').css('display', 'block');
        };

        this.hide = function () {
            $('#question').css('display', 'none');
        };

        this.getAnswer = function () {
            return $('#answer').val();
        };
    };
    return QuestionPanel;
});