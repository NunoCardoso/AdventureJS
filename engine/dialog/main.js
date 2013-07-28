/*global define, createjs, $ */

/**
 * This module handles dialogs
 */
define([
    'engine/achievement/main',
    'engine/config',
    'engine/dialog/dialog',
    'engine/dialogoption/main',
    'engine/panel/main',
    'engine/sentence/main'
], function (
    gameachievement,
    config,
    GameDialog,
    gamedialogoption,
    gamepanel,
    gamesentence
) {

    var _ = {},
        _dialogOptions, // store temporarily the current dialog

        preload = function (dialogs) {
            var i;
            for (i in dialogs) {
                _[dialogs[i].id] = new GameDialog(dialogs[i]);
            }
        },

        get = function (key) {
            return _[key];
        },

        _setPanelToDialog = function () {
            gamesentence.hide();
            gamepanel.renderForDialog({});
        },

        _setPanelToDefault = function () {
            require('engine/interaction/action').reset();
            gamepanel.renderForVerbsAndInventory();
        },

        _getCharacter = function (character) {
            var who;
            if (character.startsWith('pc.')) {
                who = require('engine/character/main').getPc();
            } else if (character.startsWith('npc.')) {
                who = require('engine/character/main').getNpc(character);
            }
            return who;
        },

        _onTalkEnded = function (options) {
            var i, act;
            for (i in options.onEnd) {
                act = options.onEnd[i];
                switch (act.action) {
                case 'displayDialogOptions':
                    gamedialogoption.addToPanel(act.dialogOptions);
                    break;
                case 'addToInventory':
                    gamepanel.addToInventory(act.object);
                    _setPanelToDefault();
                    require('engine/interaction/action').reset();
                    break;
                case 'publishAchievement':
                    gameachievement.publish(act.achievement);
                    break;
                case 'fadeToLeft':
                    var who = _getCharacter(act.character);
                    who.setTargetXY({x: -100, y: who.y});
                    _setPanelToDefault();
                    break;
                default:
                    console.log(act.action + ' not implemented!');
                    break;
                }
            }
        },

        _talk = function (options) {
            if (options.lines.length === 0) {
                if (typeof options.onEnd !== 'undefined') {
                    _onTalkEnded(options);
                } else {
                    _setPanelToDefault();
                }
                return;
            }
            var line = options.lines.shift();
            var who = _getCharacter(line.character);
            who.say(line.text, $.proxy(function () {
                _talk(options);
            }, this));
        },

        perform = function (options) {
            _setPanelToDialog();
            var pc  = require('engine/character/main').getPc();
            var npc = _getCharacter(options.to);
            // make both characters do eye contact
            pc.faceTo(npc);
            npc.faceTo(pc);
            _talk(options);
        };

    return {
        'preload' : preload,
        'get'     : get,
        'perform' : perform
    };
});