/*global define, $ */

/**
 * This module handles conditions
 */
define([
    'engine/condition/condition'
], function (
    Condition
) {
    var _ = {},
        background,

        preload = function (conditions) {
            var i;
            for (i = 0; i < conditions.length; i++) {
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