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

        set = function (key, value) {
            _[key] = value;
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
        'set'      : set,
        'getState' : getState,
        'setState' : setState
    };
});