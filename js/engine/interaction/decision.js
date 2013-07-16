/*global define */

/**
 * This module handles interactions
 */
define([
    'engine/interaction/main'
], function (
    gameinteraction
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
                        break;
                    case 'dialogMessage':
                        return {
                            'action' : action.action,
                            'text'   : action.param
                        };
                    case 'removeFromInventory':
                        break;
                    case 'addToInventory':
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
