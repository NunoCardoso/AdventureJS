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
            gamepanel.removeDialogOptions();
            gamepanel.renderForDialog();
        },

        getCharacter = function (character) {
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
                    gamepanel.addDialogOptions(act.dialogOptions);
                    _dialogOptions = act.dialogOptions;
                    gamepanel.renderForDialog();
                    break;
                case 'addToInventory':
                    gamepanel.addToInventory(act.object);
                    break;
                case 'publishAchievement':
                    gameachievement.publish(act.achievement);
                    break;
                case 'fadeToLeft':
                    var who = getCharacter(act.character);
                    who.setTargetXY({x: -100, y: who.y});
                    break;
                case 'endDialog':
                    require('engine/interaction/action').reset();
                    _dialogOptions = undefined;
                    gamepanel.renderForVerbsAndInventory();
                    break;
                default:
                    console.log(act.action + ' not implemented!');
                    break;
                }
            }
        },

        _talk = function (options) {
            if (options.lines.length === 0) {
                if (options.onEnd !== 'undefined') {
                    _onTalkEnded(options);
                } else {
                    gamepanel.addDialogOptions(_dialogOptions);
                    gamepanel.renderForDialog();
                }
                return;
            }
            var line = options.lines.shift(); // removed one line
            var who  = getCharacter(line.character);
            var defered = who.say(line.text);
            defered.done(function () {
                _talk(options);
            });
        },

        perform = function (options) {
            _setPanelToDialog();
            var pc  = require('engine/character/main').getPc();
            var npc = getCharacter(options.to);
            // make both characters do eye contact
            pc.faceTo(npc);
            npc.faceTo(pc);
            _talk(options);
        };

    return {
        'preload' : preload,
        'get'     : get,
        'perform' : perform,
        'getCharacter' : getCharacter
    };
});