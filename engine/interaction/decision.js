/*global define, $, createjs, window */

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

    var _list = [
            'continueDialogOptions',
            'startDialogOptions',
            'addDialogOption',
            'moveTo',
            'playDialog',
            'dialogMessage',
            'fromSceneToInventory',
            'fromInventoryToScene',
            'removeFromInventory',
            'removeFromScene',
            'addToInventory',
            'addToScene',
            'publishAchievement',
            'endDialog',
            'endGame',
            'goToExit',
            'setBusyIcon',
            'setDefaultIcon',
            'changeBackground',
            'wait',
            'changeAttitude',
            'changeFlag',
            'stopCharacter',
            'prompt',
            'addCharacterSalt',
            'testCondition'
        ],

        perform = function (action) {
            var d = $.Deferred(),
                character,
                deferred,
                dialog,
                dialogOptions,
                who,
                scene;

            switch (action.action) {

            case "addDialogOption":
                require('engine/dialogoption/main').appendTo(
                    action.dialogOptions,
                    action
                );
                break;
            case "continueDialogOptions":
                dialogOptions = require('engine/dialogoption/main').get(action.dialogOptions);
                require('engine/panel/main').addDialogOptions(dialogOptions);
                require('engine/panel/main').renderForDialog();
                break;
            case "startDialogOptions":
                dialogOptions = require('engine/dialogoption/main').get(action.dialogOptions);
                require('engine/panel/main').addDialogOptions(dialogOptions);
                require('engine/panel/main').renderForDialog();
                break;
            case 'moveTo':
                character = gamedialog.getCharacter(action.character);
                deferred = character.moveTo(action.position, 'global');
                deferred.done(function () {
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
                    d.resolve();
                });
                return d.promise();
            case 'fromSceneToInventory':
                require('engine/stage/main').get()
                    .getCurrentScene().removeObject(action.object);
                require('engine/panel/main').addToInventory(action.object);
                break;
            case 'fromInventoryToScene':
                require('engine/stage/main').get()
                    .getCurrentScene().addObjectToScene(action.object, action.position);
                require('engine/panel/main').removeFromInventory(action.object);
                break;
            case 'removeFromInventory':
                require('engine/panel/main').removeFromInventory(action.object);
                break;
            case 'removeFromScene':
                require('engine/stage/main').get()
                    .getCurrentScene().removeObject(action.object);
                break;
            case 'addToInventory':
                require('engine/panel/main').addToInventory(action.object);
                break;
            case 'addToScene': 
                require('engine/stage/main').get()
                    .getCurrentScene().addObjectToScene(action.object, action.position);
                break;
            case 'publishAchievement':
                require('engine/achievement/main').publish(action.achievement);
                break;
            case 'endDialog':
                require('engine/interaction/action').reset();
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
                        toScene,
                        action.scene
                    );
                }
                break;
            case 'setBusyIcon':
                require('engine/cursor/main').setBusy();
                require('engine/panel/main').renderForCutscene();
                break;
            case 'setDefaultIcon':
                require('engine/cursor/main').setNotBusy();
                require('engine/panel/main').renderForVerbsAndInventory();
                break;
            case 'changeBackground':
                scene = require('engine/stage/main').get()
                    .getCurrentScene();
                deferred = scene.background.switchBackgroundTo(action.newBackground, action.backgroundmode);
                deferred.done(function () {
                    d.resolve();
                });
                return d.promise();
            case 'wait':
                createjs.Tween.get(this).wait(action.howmuch).call(function () {
                    d.resolve();
                });
                return d.promise();
            case 'changeAttitude':
                who = gamedialog.getCharacter(action.character);
                who.changeAttitudeTo(action.attitude);
                break;
            case 'setFlag':
                require('engine/flags/main').set(action.flag, action.value);
                break;
            case 'prompt':
                var gametemplate = require('engine/tpl/main');
                deferred = gametemplate.openQuestion(action.text);
                deferred.done(function (answer) {
                    require('engine/flags/main').set(action.variable, answer);
                    d.resolve();
                });
                return d.promise();
            case 'addCharacterSalt':
                var char = require('engine/character/main').getPc();
                char.addSalt(action.salt);
                break;
            case 'testCondition':
                var condition = require('engine/condition/main').get(action.condition);
                condition.doTest();
                if (condition.persistence === 'once') {
                    condition.executed = true;
                }
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
                    this.performList({taskList: a.actions});
                }
            } else {
                perform({
                    'action'    : 'dialogMessage',
                    'character' : require('engine/character/main').getPc().name,
                    'text'      : 'I can\'t do that.'
                });
            }
        },

        getAllActions = function () {
            return _list;
        };

    return {
        'decide'        : decide,
        'perform'       : perform,
        'performList'   : performList,
        'getAllActions' : getAllActions
    };
});