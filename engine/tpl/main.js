/*global define, Handlebars, createjs, $ */

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
    'engine/stage/main',
    'engine/savegame/main'
], function (
    loadgameTpl,
    savegameTpl,
    settingsTpl,
    LoadGamePanel,
    SaveGamePanel,
    SettingsPanel,
    gamestage,
    savegame
) {

    var item,

        openSettings = function () {
            if (!item) {
                var template = Handlebars.compile(settingsTpl);
                $('#forms').html(template({}));
                item = new SettingsPanel();
                item.show();
                gamestage.get().addChild(item);
                gamestage.update();
            }
        },

        close = function () {
            gamestage.get().removeChild(item);
            item.hide();
            item = undefined;
            $('#forms').html('');
        },

        openSavegame = function () {
            if (!item) {
                var template = Handlebars.compile(savegameTpl),
                    savegames = savegame.getAll();
                $('#forms').html(template({'savegames': savegames}));
                item = new SaveGamePanel();
                item.show();
                gamestage.get().addChild(item);
                gamestage.update();
            }
        },

        openLoadgame = function () {
            if (!item) {
                var template = Handlebars.compile(loadgameTpl),
                    savegames = savegame.getAll();
                $('#forms').html(template({'savegames': savegames}));
                item = new LoadGamePanel();
                item.show();
                gamestage.get().addChild(item);
                gamestage.update();
            }
        };

    return {
        'openSettings'  : openSettings,
        'close'         : close,
        'openSavegame'  : openSavegame,
        'openLoadgame'  : openLoadgame,
    };
});