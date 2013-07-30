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

    //playDialog:
    // action=dialogMessage. character=pc, text=text

    // from dialog: 
    //'to' : pc, lines 'character' : 'pc.guybrush', 'text' : 'Hello.'

    var perform = function (action) {
            var d = $.Deferred(),
                character,
                deferred,
                dialog,
                scene;

            switch (action.action) {
            case 'moveTo':
                character = gamedialog.getCharacter(action.character);
                deferred = character.moveTo(action.position);
                deferred.done(function () {
                    console.log('move to done');
                    d.resolve();
                });
                return d.promise();
            case 'playDialog':
                dialog = gamedialog.get(action.target);
                gamedialog.perform({
                    // slice(0) clones it, because gamedialog will destroy it
                    lines : dialog.lines.slice(0),
                    to    : dialog.to,
                    onEnd : dialog.onEnd
                });
                break;
            case 'dialogMessage':
                require('engine/interaction/action').reset();
                scene = require('engine/stage/main').getInstance()
                    .getCurrentScene();
                character = gamedialog.getCharacter(action.character);
                deferred = character.say(action.text);
                deferred.done(function () {
                    console.log('dialog done');
                    d.resolve();
                });
                return d.promise();
            case 'fromSceneToInventory':
                require('engine/stage/main').getInstance()
                    .getCurrentScene().removeObject(action.target);
                require('engine/panel/main').addToInventory(action.target);
                break;
            case 'removeFromInventory':
                require('engine/panel/main').removeFromInventory(action.target);
                break;
            case 'addToInventory':
                require('engine/panel/main').addToInventory(action.target);
                break;
            case 'publishAchievement':
                require('engine/achievement/main').publish(action.achievement);
                break;
            default:
                console.log(action.action + ' not implemented!');
                break;
            }
        },

        performCutscene = function (cutscenes) {

            require('engine/cursor/main').setBusy();
            var _cutscenes = cutscenes.slice(0); // clone it
            if (_cutscenes.length > 0) {
                var _cutscene = _cutscenes.shift();
                var decision = require('engine/interaction/decision');
                var deferred = decision.perform(_cutscene);
                deferred.done($.proxy(function () {
                    // do next one
                    this.performCutscene(_cutscenes);
                }, this));
            } else {
            // executed only when all cutscenes were played
                require('engine/cursor/main').setNotBusy();
            }
        },

        decide = function (verb, first, second) {

            var mainactions = gameinteraction.find(verb, first, second),
                a,
                action,
                i,
                j;

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
        };

    return {
        'decide' : decide,
        'perform' : perform,
        'performCutscene' : performCutscene
    };
});
