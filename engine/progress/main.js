/*global define */

/**
 * This module handles progress
 */
define([
], function (
) {

    var _progress = 0,

        get = function () {
            return _progress;
        },

        add = function () {
            _progress++;
        };

    return {
        'get' : get,
        'add' : add
    };
});
