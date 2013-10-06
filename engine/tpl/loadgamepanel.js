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
        this.regX = 350;// width = 700
        this.regY = 250;// height = 500

        this.x = config.getCanvasXY().x / 2;
        this.y = config.getCanvasXY().y / 2;

        this.show = function () {
            $('#loadgame').css('display', 'block');
        };

        this.hide = function () {
            $('#loadgame').css('display', 'none');
        };
    };
    return LoadGamePanel;
});