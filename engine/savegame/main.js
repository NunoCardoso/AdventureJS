/*global define */

define([
], function (
) {

    var games = {},

        save = function (jsonstring, slot) {
            slot = slot || 0;
            games[slot] = jsonstring;
        },

        load = function (slot) {
            return games[slot];
        };

    return {
        'save' : save,
        'load' : load
    };
});