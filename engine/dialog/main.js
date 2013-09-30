/*global define, createjs, $ */

/**
 * This module handles dialogs
 */
define([
    'engine/config',
    'engine/dialog/dialog',
    'engine/dialogoption/main',
    'engine/panel/main',
    'engine/sentence/main'
], function (
    config,
    GameDialog,
    gamedialogoption,
    gamepanel,
    gamesentence
) {

    var _ = {},

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

        _continueDialogOptions = function () {
            require('engine/interaction/decision').perform({
                'action' : 'continueDialogOptions'
            });
        },

        _talk = function (options) {
            if (options.lines.length === 0) {
                if (options.onEnd === undefined) {
                    _continueDialogOptions();
                } else {
                    require('engine/interaction/decision').performList({
                        taskList : options.onEnd
                    });
                }
                return;
            }
            
            var line = options.lines.shift(), // removed one line
                who  = getCharacter(line.character),
                defered = who.say(line.text);

            defered.done(function () {
                _talk(options);
            });
        },

        perform = function (options) {
            _setPanelToDialog();
            var pc  = require('engine/character/main').getPc(),
                npc = getCharacter(options.to);
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