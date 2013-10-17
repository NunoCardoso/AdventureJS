/*global define, Handlebars, createjs, $ */

/**
 * This is the start button label
 */
define([
    'text!engine/tpl/loadgame.template',
    'text!engine/tpl/savegame.template',
    'text!engine/tpl/settings.template',
    'text!engine/tpl/help.template',
    'text!engine/tpl/question.template',
    'engine/tpl/loadgamepanel',
    'engine/tpl/savegamepanel',
    'engine/tpl/settingspanel',
    'engine/tpl/helppanel',
    'engine/tpl/questionpanel',
    'engine/savegame/main'
], function (
    loadgameTpl,
    savegameTpl,
    settingsTpl,
    helpTpl,
    questionTpl,
    LoadGamePanel,
    SaveGamePanel,
    SettingsPanel,
    HelpPanel,
    QuestionPanel,
    savegame
) {

    var item,
        gamestage,
        template,
        d,

        openSettings = function () {
            if (!item) {
                template = Handlebars.compile(settingsTpl);
                $('#forms').html(template({}));
                item = new SettingsPanel();
                item.show();
                gamestage = require('engine/stage/main');
                gamestage.get().addChild(item);
                gamestage.update();
            }
        },

        openHelp = function (text) {
            if (!item) {
                template = Handlebars.compile(helpTpl);
                $('#forms').html(template({
                    text: text || 'No description available.'
                }));
                item = new HelpPanel();
                item.show();
                gamestage = require('engine/stage/main');
                gamestage.get().addChild(item);
                gamestage.update();
            }
        },

        openQuestion = function (text) {
            if (!item) {
                d = $.Deferred();
                template = Handlebars.compile(questionTpl);
                $('#forms').html(template({
                    text: text || 'No description available.'
                }));
                item = new QuestionPanel();
                item.show();
                gamestage = require('engine/stage/main');
                gamestage.get().addChild(item);
                gamestage.update();
                return d;
            }
        },

        close = function () {
            gamestage = require('engine/stage/main');
            gamestage.get().removeChild(item);
            if (item) {
                item.hide();
                item = undefined;
            }
            $('#forms').html('');
        },

        answer = function () {
            gamestage = require('engine/stage/main');
            gamestage.get().removeChild(item);
            if (item) {
                var answer = item.getAnswer();
                item.hide();
                item = undefined;
                d.resolve(answer);
            }
            $('#forms').html('');
        },

        doSavegame = function (savegames) {
            $('#forms').html(template({'savegames': savegames}));
            item = new SaveGamePanel();
            item.show();
            gamestage = require('engine/stage/main');
            gamestage.get().addChild(item);
            gamestage.update();
        },

        openSavegame = function () {
            if (!item) {
                template = Handlebars.compile(savegameTpl);
                var d = savegame.getAll();

                // d can be either a deferred, or the object.
                if (d.done) {
                    d.done(doSavegame);
                } else {
                    doSavegame(d);
                }
            }
        },

        doLoadgame = function (savegames) {
            $('#forms').html(template({'savegames': savegames}));
            item = new LoadGamePanel();
            item.show();
            gamestage = require('engine/stage/main');
            gamestage.get().addChild(item);
            gamestage.update();
        },

        openLoadgame = function () {
            if (!item) {
                template = Handlebars.compile(loadgameTpl);
                var d = savegame.getAll();

                // d can be either a deferred, or the object.
                if (d.done) {
                    d.done(doLoadgame);
                } else {
                    doLoadgame(d);
                }
            }
        };

    return {
        'openSettings'  : openSettings,
        'openHelp'      : openHelp,
        'openQuestion'  : openQuestion,
        'openSavegame'  : openSavegame,
        'openLoadgame'  : openLoadgame,
        'close'         : close,
        'answer'        : answer
    };
});