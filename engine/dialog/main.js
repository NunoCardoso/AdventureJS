/*global define, createjs, $ */

/**
 * This module handles dialogs
 */
define([
    'engine/dialog/dialog',
    'engine/dialog/options',
    'engine/panel/background'
], function (
    GameDialog,
    gamedialogoptions,
    Background
) {

    var _ = {},
        _container,
        _background,
        _dialogOptions, // store temporarily, easier to remove

        preload = function (dialogs) {
            var i;
            for (i = 0; i < dialogs.length; i++) {
                _[dialogs[i].id] = new GameDialog(dialogs[i]);
            }
            _background = new Background();
            _container = new createjs.Container();
            _container.name = 'container.dialog';
            _container.addChild(_background);
        },

        get = function (key) {
            return _[key];
        },

        _addDialogPanel = function () {
            var stage = require('engine/stage/main').getInstance();
            stage.getCurrentScene().static.addChild(_container);
        },

        _removeDialogPanel = function () {
            var stage = require('engine/stage/main').getInstance();
            stage.getCurrentScene().static.removeChild(_container);
        },

        _addDialogOptionsToDialogPanel = function (options) {
            var i,
                _do = gamedialogoptions.init(options),
                _doc = new createjs.Container();

            for (i in _do) {
                _doc.addChild(_do[i]);
            }

            _dialogOptions = _do; // save it temporarily
            _container.addChild(_doc);
        },

        _initContainer = function () {
            // easier to clean everything, then just add the black background
            _container.removeAllChildren();
            _container.addChild(_background);
        },

        _onEnd = function (options) {
            switch (options.onEnd.action) {
            case 'displayDialogOptions':
                _addDialogOptionsToDialogPanel({
                    'dialogOptions' : options.onEnd.dialogOptions,
                    'pc'            : options.pc,
                    'npc'           : options.npc
                });
                break;
            case 'addToInventory':
                require('engine/panel/main').addToInventory(options.onEnd.object);
                _removeDialogPanel();
                require('engine/interaction/action').reset();
                break;
            default:
                console.log(options.onEnd.action + ' not implemented!');
                break;
            }
        },

        _do = function (options) {
            if (options.lines.length === 0) {
                if (typeof options.onEnd !== 'undefined') {
                    _onEnd(options);
                } else {
                    _removeDialogPanel();
                }
                return;
            }
            var line = options.lines.shift();
            if (options.pc.name === 'character.' + line.character) {
                options.pc.say(line.text, $.proxy(function () {
                    _do(options);
                }, this));
            } else if (options.npc.name === 'character.' + line.character) {
                options.npc.say(line.text, $.proxy(function () {
                    _do(options);
                }, this));
            }
        },

        perform = function (options) {
            _initContainer();
            _addDialogPanel();
            // make both characters do eye contact
            options.pc.faceTo(options.npc);
            options.npc.faceTo(options.pc);
            _do(options);
        };

    return {
        'preload' : preload,
        'get'     : get,
        'perform' : perform
    };
});