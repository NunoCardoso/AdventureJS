/*global define, createjs, $ */

/**
 * This module handles the playable character
 */
define([
    'engine/character/playablecharacter'
], function (
    PlayableCharacter
) {

    var pc,

        load = function (character) {
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
        'load' : load,
        'get'  : get,
        'updatePosition' : updatePosition
    };
});
