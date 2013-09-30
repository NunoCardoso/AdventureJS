/*global document, define, createjs, $ */

/**
 * This is the start button label
 */
define([
    'engine/config',
    'engine/game/preferences'
], function (
    config,
    gamepreferences
) {
    var SettingsPanel = function (options) {
        this.initialize(options);
    };

    SettingsPanel.prototype = new createjs.DOMElement(document.getElementById("forms"));
    SettingsPanel.prototype.SettingsPanel_initialize = SettingsPanel.prototype.initialize;
    SettingsPanel.prototype.initialize = function (options) {

        this.name = 'settings';
        this.x = config.get('game.w') / 2 - 100; // width = 200
        this.y = config.get('game.h') / 2 - 30; // height = 60

        this.show = function () {
            var preferences = gamepreferences.getPreferences();
            $("#preferences-enable-sound").attr('checked', preferences.soundEnable === "true");
            $("#preferences-enable-music").attr('checked', preferences.musicEnable === "true");
            $("#preferences-enable-debug").attr('checked', preferences.debug === "true");
            $("#preferences-volume-sound").val(parseInt(preferences.soundVolume, 10));
            $("#preferences-volume-music").val(parseInt(preferences.musicVolume, 10));
            $('#settings').css('display', 'block');
        };

        this.hide = function () {
            $('#settings').css('display', 'none');
        };
    };
    return SettingsPanel;
});