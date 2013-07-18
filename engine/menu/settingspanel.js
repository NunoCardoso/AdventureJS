/*global define, createjs, $ */

/**
 * This is the start button label
 */
define([
    'engine/config'
], function (
    config
) {
    var SettingsPanel = function (options) {
        this.initialize(options);
    };

    SettingsPanel.prototype = new createjs.DOMElement('settings');
    SettingsPanel.prototype.SettingsPanel_initialize = SettingsPanel.prototype.initialize;
    SettingsPanel.prototype.initialize = function (options) {
        this.name = 'settings';
        this.x = config.getCanvasXY().x / 2 - 100; // width = 200
        this.y = config.getCanvasXY().y / 2 - 30; // height = 60

        this.show = function () {
            $('#settings').css('display', 'block');
        };

        this.hide = function () {
            $('#settings').css('display', 'none');
        };
    };
    return SettingsPanel;
});