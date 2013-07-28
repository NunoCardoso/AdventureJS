/*global define, createjs, $ */

/**
 * This module handles dialogs
 */
define([
    'engine/exit/exit'
], function (
    Exit
) {

    var _ = {},

        preload = function (exits) {
            var i;
            for (i in exits) {
                _[exits[i].id] = new Exit(exits[i]);
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