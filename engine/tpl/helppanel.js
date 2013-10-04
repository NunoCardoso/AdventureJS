/*global document, define, createjs, $ */

/**
 * This is the scene description
 */
define([
    'engine/config'
], function (
    config
) {
    var HelpPanel = function (options) {
        this.initialize(options);
    };

    HelpPanel.prototype = new createjs.DOMElement(document.getElementById("forms"));
    HelpPanel.prototype.HelpPanel_initialize = HelpPanel.prototype.initialize;
    HelpPanel.prototype.initialize = function (options) {

        this.name = 'help';
        this.x = config.get('game.w') / 2 - 200; // width = 400
        this.y = config.get('game.h') / 2 - 30; // height = 60

        this.show = function () {
            $('#help').css('display', 'block');
        };

        this.hide = function () {
            $('#help').css('display', 'none');
        };
    };
    return HelpPanel;
});