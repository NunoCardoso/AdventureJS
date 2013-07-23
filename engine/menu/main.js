/*global define */

/**
 * This module instantiates the menu singleton
 */
define([
    'engine/menu/menu'
], function (
    GameMenu
) {

    var menu,

        preload = function (options) {
            menu = new GameMenu(options);
        },

        get = function () {
            return menu;
        };

    return {
        'preload' : preload,
        'get' : get,
    };
});
