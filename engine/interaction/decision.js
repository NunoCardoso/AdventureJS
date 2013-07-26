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

    var decide = function (verb, first, second) {

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
                    switch (action.action) {
                    case 'playDialog':
                        return {
                            'action' : action.action,
                            'dialog' : gamedialog.get(action.target)
                        };
                    case 'dialogMessage':
                        return {
                            'action' : action.action,
                            'text'   : action.param
                        };
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
                }
            }
        } else {
            return {
                'action' : 'dialogMessage',
                'text'   : 'I can\'t do that.'
            };
        }
    };

    return {
        'decide' : decide
    };
});
