/*global define */

/**
 * This module instantiates the menu singleton
 */
define([
    'engine/menu/menu'
], function (
    GameMenu
) {

    var _menu,

        preload = function (options) {
            _menu = new GameMenu(options);
        },

        get = function () {
            return _menu;
        };

    return {
        'preload' : preload,
        'get'     : get
    };
});
