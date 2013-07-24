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

        update = function (stage, xy) {
            _.update(stage, xy);
        };

    return {
        'preload' : preload,
        'get'     : get,
        'update'  : update
    };
});
