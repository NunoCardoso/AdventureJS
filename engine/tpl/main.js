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
                gamestage.getInstance().addChild(item);
                gamestage.update();
            }
        },

        close = function () {
            gamestage.getInstance().removeChild(item);
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
                gamestage.getInstance().addChild(item);
                gamestage.update();
            }
        },

        closeSavegame = function () {
            if (dosave) {
                savegame.save(json, slot);
            }
            close();
        },

        openLoadgame = function () {
            if (!item) {
                var template = Handlebars.compile(loadgameTpl),
                    savegames = savegame.getAll();
                $('#forms').html(template({savegames: savegames}));
                item = new LoadGamePanel();
                item.show();
                gamestage.getInstance().addChild(item);
                gamestage.update();
            }
        },

        closeLoadgame = function () {
            var json;
            if (doload) {
                json = savegame.load(slot);
            }
            close();

            createjs.Ticker.setPaused(false);
            gamestate.setFromJSON(json);
        };

    return {
        'openSettings'  : openSettings,
        'close'         : close,
        'openSavegame'  : openSavegame,
        'closeSavegame' : closeSavegame,
        'openLoadgame'  : openLoadgame,
        'closeLoadgame' : closeLoadgame
    };
});