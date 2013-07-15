/*global define */

/**
 * This module handles the playable character
 */
define([
    'engine/pcharacter/playablecharacter'
], function (
    PlayableCharacter
) {

    var pc,

        preload = function (character) {
            pc = new PlayableCharacter(character);
        },

        get = function () {
            return pc;
        },

        updatePosition = function () {
            if (pc) {
                pc.updatePosition();
            }
        };

    return {
        'preload' : preload,
        'get'     : get,
        'updatePosition' : updatePosition
    };
});
