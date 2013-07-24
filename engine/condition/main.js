/*global define, $ */

/**
 * This module handles conditions from the game
 */
define([
    'engine/condition/condition'
], function (
    Condition
) {
    var _ = {},

        preload = function (conditions) {
            var i;
            for (i in conditions) {
                _[conditions[i].id] = new Condition(conditions[i]);
            }
        },

        get = function (key) {
            return _[key];
        };

    return {
        'preload' : preload,
        'get'     : get
    };
});