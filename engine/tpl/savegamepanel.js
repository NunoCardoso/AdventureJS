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
        this.x = config.get('game.w') / 2 - 200; // width = 400
        this.y = config.get('game.h') / 2 - 150; // height = 400

        this.show = function () {
            $('#savegame').css('display', 'block');
        };

        this.hide = function () {
            $('#savegame').css('display', 'none');
        };
    };
    return SaveGamePanel;
});