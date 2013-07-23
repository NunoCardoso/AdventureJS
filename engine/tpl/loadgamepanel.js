/*global document, define, createjs, $ */

/**
 * This is the start button label
 */
define([
    'engine/config'
], function (
    config
) {
    var LoadGamePanel = function (options) {
        this.initialize(options);
    };

    LoadGamePanel.prototype = new createjs.DOMElement(document.getElementById("forms"));
    LoadGamePanel.prototype.LoadGamePanel_initialize = LoadGamePanel.prototype.initialize;
    LoadGamePanel.prototype.initialize = function (options) {
     //   LoadGamePanel.prototype.LoadGamePanel_initialize();

        this.name = 'LoadGame';
        this.x = config.get('game.w') / 2 - 200; // width = 400
        this.y = config.get('game.h') / 2 - 150; // height = 400

        this.show = function () {
            $('#loadgame').css('display', 'block');
        };

        this.hide = function () {
            $('#loadgame').css('display', 'none');
        };
    };
    return LoadGamePanel;
});