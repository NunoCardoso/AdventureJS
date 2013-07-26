/*global define, createjs, $ */

/**
 * This module handles dialogs
 */
define([
    'engine/dialog/dialog',
    'engine/dialog/options',
    'engine/panel/main',
    'engine/sentence/main'
], function (
    GameDialog,
    gamedialogoptions,
    gamepanel,
    gamesentence
) {

    var _ = {},
        _dialogOptions, // store temporarily the current dialog

        preload = function (dialogs) {
            var i;
            for (i = 0; i < dialogs.length; i++) {
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

        _addDialogOptionsToPanel = function (options) {
            var i,
                _do = gamedialogoptions.init(options),
                _doc = new createjs.Container();

            for (i in _do) {
                _doc.addChild(_do[i]);
            }
            _dialogOptions = _do; // save it temporarily
            gamepanel.addDialogs(_doc);
        },


        _onTalkEnded = function (options) {
            switch (options.onEnd.action) {
            case 'displayDialogOptions':
                _addDialogOptionsToPanel({
                    'dialogOptions' : options.onEnd.dialogOptions,
                    'pc'            : options.pc,
                    'npc'           : options.npc
                });
                break;
            case 'addToInventory':
                gamepanel.addToInventory(options.onEnd.object);
                _setPanelToDefault();
                require('engine/interaction/action').reset();
                break;
            default:
                console.log(options.onEnd.action + ' not implemented!');
                break;
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
            if (options.pc.name === line.character) {
                options.pc.say(line.text, $.proxy(function () {
                    _talk(options);
                }, this));
            } else if (options.npc.name === line.character) {
                options.npc.say(line.text, $.proxy(function () {
                    _talk(options);
                }, this));
            }
        },

        perform = function (options) {
            _setPanelToDialog();
            // make both characters do eye contact
            options.pc.faceTo(options.npc);
            options.npc.faceTo(options.pc);
            _talk(options);
        };

    return {
        'preload' : preload,
        'get'     : get,
        'perform' : perform
    };
});