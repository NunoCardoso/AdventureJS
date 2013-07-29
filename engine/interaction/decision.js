/*global define */

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

    var perform = function (action) {
            switch (action.action) {
            case 'playDialog':
                var dialog = gamedialog.get(action.target);
                gamedialog.perform({
                    // slice(0) clones it, because gamedialog will destroy it
                    lines : dialog.lines.slice(0),
                    to    : dialog.to,
                    onEnd : dialog.onEnd
                });
                break;
            case 'dialogMessage':
                require('engine/interaction/action').reset();
                var scene = require('engine/stage/main').getInstance()
                    .getCurrentScene();
                var pc = scene.getPc();
                pc.say(action.text);
                break;
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
                    'text'   : 'I can\'t do that.'
                });
            }
        };

    return {
        'decide' : decide,
        'perform' : perform
    };
});
