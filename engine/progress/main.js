/*global define */

/**
 * This module handles progress
 */
define([
], function (
) {

    var progress = 0,
        total,

        get = function () {
            return progress;
        },

        getAsPerc = function () {
            return (progress / total) * 100;
        },

        setTotal = function (_total) {
            total = _total;
        },

        increment = function () {
            progress++;
        };

    return {
        'get' : get,
        'getAsPerc' : getAsPerc,
        'setTotal'  : setTotal,
        'increment' : increment
    };
});
