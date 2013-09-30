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
        },

        getState = function () {
            return _;
        },

        setState = function (flags) {
            _ = flags;
        };

    return {
        'preload'  : preload,
        'get'      : get,
        'getState' : getState,
        'setState' : setState
    };
});