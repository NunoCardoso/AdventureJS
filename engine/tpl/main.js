/*global define, Handlebars, $ */

/**
 * This is the start button label
 */
define([
    'text!engine/tpl/loadgame.template',
    'text!engine/tpl/savegame.template',
    'text!engine/tpl/settings.template',
    'engine/tpl/loadgamepanel',
    'engine/tpl/savegamepanel',
    'engine/tpl/settingspanel',
    'engine/stage/main'
], function (
    loadgameTpl,
    savegameTpl,
    settingsTpl,
    LoadGamePanel,
    SaveGamePanel,
    SettingsPanel,
    gamestage
) {

    var item,

        openSettings = function () {
            if (!item) {
                var template = Handlebars.compile(settingsTpl);
                $('#forms').html(template({}));
                item = new SettingsPanel();
                item.show();
                gamestage.getInstance().addChild(item);
                gamestage.update();
            }
        },

        closeSettings = function () {
            gamestage.getInstance().removeChild(item);
            item.hide();
            item = undefined;
            $('#forms').html('');

        };

    return {
        'openSettings' : openSettings,
        'closeSettings' : closeSettings
    };
});


