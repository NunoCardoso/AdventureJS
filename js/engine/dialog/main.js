/*global define, $ */

/**
 * This module handles dialogs
 */
define([
    'engine/dialog/dialog',
    'engine/dialog/background'
], function (
    GameDialog,
    Background
) {

    var _ = {},
        background,

        preload = function (dialogs) {
            var i;
            for (i = 0; i < dialogs.length; i++) {
                _[dialogs[i].id] = new GameDialog(dialogs[i]);
            }
            background = new Background();
        },

        get = function (key) {
            return _[key];
        },

        _addPanel = function () {
            var stage = require('engine/stage/main').getInstance();
            stage.addChild(background);
        },

        _removePanel = function () {
            var stage = require('engine/stage/main').getInstance();
            stage.removeChild(background);
        },

        _do = function (options) {
            if (options.lines.length === 0) {
                if (typeof options.onDialogComplete === 'function') {
                    options.onDialogComplete();
                }
                return;
            }
            var line = options.lines.shift();
            if (options.pc.name === 'character.' + line.character) {
                options.pc.say(line.line, $.proxy(function () {
                    _do(options);
                }, this));
            } else if (options.npc.name === 'character.' + line.character) {
                options.npc.say(line.line, $.proxy(function () {
                    _do(options);
                }, this));
            }
        },

        perform = function (options) {
            _addPanel();
            options.onDialogComplete = function () {
                _removePanel();
            };
            _do(options);
        };

    return {
        'preload' : preload,
        'get'     : get,
        'perform' : perform
    };
});