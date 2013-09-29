/*global define */

/**
 * This module handles flags
 */
define([
], function (
) {

    var _ = {},

        preload = function (flags) {
            _ = flags;
        },

        get = function (key) {
            return _[key];
        };

    return {
        'preload' : preload,
        'get'     : get
    };
});