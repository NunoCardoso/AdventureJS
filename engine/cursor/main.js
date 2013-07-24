/*global define */

/**
 * This module handles the cursor
 */
define([
    'engine/cursor/cursor'
], function (
    Cursor
) {
    var _,

        preload = function () {
            _ = new Cursor();
        },

        get = function () {
            return _;
        },

        updatePosition = function (stage, xy) {
            _.updatePosition(stage, xy);
        };

    return {
        'preload' : preload,
        'get' : get,
        'updatePosition' : updatePosition
    };
});
