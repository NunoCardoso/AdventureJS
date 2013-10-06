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

        this.regX = 350;// width = 700
        this.regY = 250;// height = 500

        this.x = config.getCanvasXY().x / 2;
        this.y = config.getCanvasXY().y / 2;

        this.show = function () {
            $('#savegame').css('display', 'block');
        };

        this.hide = function () {
            $('#savegame').css('display', 'none');
        };
    };
    return SaveGamePanel;
});