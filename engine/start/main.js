/*global define */

/**
 * This module instantiates the start singleton
 */
define([
    'engine/start/start'
], function (
    GameStart
) {

    var _,

        preload = function (options) {
            _ = new GameStart(options);
        },

        get = function () {
            return _;
        };

    return {
        'preload' : preload,
        'get'     : get
    };
});
