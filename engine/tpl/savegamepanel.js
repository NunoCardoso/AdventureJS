/*global document, define, createjs, $ */

/**
 * This is the start button label
 */
define([
    'engine/config'
], function (
    config
) {
    var SaveGamePanel = function (options) {
        this.initialize(options);
    };

    SaveGamePanel.prototype = new createjs.DOMElement(document.getElementById("forms"));
    SaveGamePanel.prototype.SaveGamePanel_initialize = SaveGamePanel.prototype.initialize;
    SaveGamePanel.prototype.initialize = function (options) {
     //   SaveGamePanel.prototype.SaveGamePanel_initialize();

        this.name = 'SaveGame';
        this.x = config.get('game.w') / 2 - 100; // width = 200
        this.y = config.get('game.h') / 2 - 30; // height = 60

        this.show = function () {
            $('#SaveGame').css('display', 'block');

        };

        this.hide = function () {
            $('#SaveGame').css('display', 'none');
        };
    };
    return SaveGamePanel;
});