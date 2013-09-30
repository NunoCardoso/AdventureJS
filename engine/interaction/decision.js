/*global define, $ */

/**
 * This module handles interactions
 */
define([
    'engine/interaction/main',
    'engine/dialog/main'
], function (
    gameinteraction,
    gamedialog
) {

    var _do,

        _list = [
            'continueDialogOptions',
            'startDialogOptions',
            'moveTo',
            'playDialog',
            'dialogMessage',
            'fromSceneToInventory',
            'removeFromInventory',
            'addToInventory',
            'publishAchievement',
            'fadeToLeft',
            'endDialog',
            'endGame',
            'goToExit',
            'setBusyIcon',
            'setDefaultIcon',
            'changeBackground'
        ],

        perform = function (action) {
            var d = $.Deferred(),
                character,
                deferred,
                dialog,
                scene;

            switch (action.action) {
            case "continueDialogOptions":
                require('engine/panel/main').addDialogOptions(_do);
                require('engine/panel/main').renderForDialog();
                break;
            case "startDialogOptions":
                var dialogOptions = require('engine/dialogoption/main').get(action.dialogOptions);
                _do = dialogOptions;
                require('engine/panel/main').addDialogOptions(dialogOptions);
                require('engine/panel/main').renderForDialog();
                break;
            case 'moveTo':
                character = gamedialog.getCharacter(action.character);
                deferred = character.moveTo(action.position, 'global');
                deferred.done(function () {
                    console.log('move to done');
                    d.resolve();
                });
                return d.promise();
            case 'playDialog':
                dialog = gamedialog.get(action.dialog);
                gamedialog.perform({
                    // slice(0) clones it, because gamedialog will destroy it
                    lines : dialog.lines.slice(0),
                    to    : dialog.to,
                    onEnd : dialog.onEnd
                });
                break;
            case 'dialogMessage':
                require('engine/interaction/action').reset();
                scene = require('engine/stage/main').get()
                    .getCurrentScene();
                character = gamedialog.getCharacter(action.character);
                deferred = character.say(action.text);
                deferred.done(function () {
                    console.log('dialog done');
                    d.resolve();
                });
                return d.promise();
            case 'fromSceneToInventory':
                require('engine/stage/main').get()
                    .getCurrentScene().removeObject(action.object);
                require('engine/panel/main').addToInventory(action.object);
                break;
            case 'removeFromInventory':
                require('engine/panel/main').removeFromInventory(action.object);
                break;
            case 'addToInventory':
                require('engine/panel/main').addToInventory(action.object);
                break;
            case 'publishAchievement':
                require('engine/achievement/main').publish(action.achievement);
                break;
            case 'fadeToLeft':
                var who = gamedialog.getCharacter(action.character);
                who.setTargetXY({x: -100, y: who.y});
                break;
            case 'endDialog':
                require('engine/interaction/action').reset();
                _do = undefined;
                require('engine/panel/main').renderForVerbsAndInventory();
                break;
            case 'endGame':
                require('engine/achievement/main').publish('achievement.gameover');
                break;
            case 'goToExit':
                // have to find the scene that has the exits.to scene.
                // since exits and scenes are not rendered, I have to iterate scenes.
                var toScene = require('engine/scene/main').findSceneWithExit(action.exit);
                if (toScene) {
                    var stage = require('engine/stage/main').get();
                    stage.switchScene(
                        stage.getCurrentScene().name,
                        toScene,
                        action.scene
                    );
                }
                break;
            case 'setBusyIcon':
                require('engine/cursor/main').setBusy();
                break;
            case 'setDefaultIcon':
                require('engine/cursor/main').setNotBusy();
                break;
            case 'changeBackground':
                scene = require('engine/stage/main').get()
                    .getCurrentScene();
                scene.background.switchBackgroundTo(action.newBackground);
                break;
            default:
                console.log(action.action + ' not implemented!');
                break;
            }
        },

        performList = function (options) {
            var self = this;

            var _list = options.taskList.slice(0); // clone it
            if (_list.length > 0) {
                var item = _list.shift();
                var deferred2 = perform(item);
                if (deferred2) {
                    deferred2.done(function () {
                        self.performList({taskList: _list, whenDone: options.whenDone});
                    });
                } else {
                    self.performList({taskList: _list, whenDone: options.whenDone});
                }
            } else {
                if (typeof options.whenDone === 'function') {
                    options.whenDone.apply();
                }
            }
        },

        decide = function (verb, first, second) {
            var mainactions = gameinteraction.find(verb, first, second),
                a,
                i,
                j,
                action;

            if (mainactions.length > 0) {
                for (i = 0; i < mainactions.length; i++) {
                    a = mainactions[i];
                    for (j = 0; j < a.actions.length; j++) {
                        action = a.actions[j];
                        perform(action);
                    }
                }
            } else {
                perform({
                    'action' : 'dialogMessage',
                    // TODO CHANGE
                    'character' : 'pc.guybrush',
                    'text'   : 'I can\'t do that.'
                });
            }
        },

        getAllActions = function () {
            return _list;
        };

    return {
        'decide' : decide,
        'perform' : perform,
        'performList' : performList,
        'getAllActions' : getAllActions
    };
});