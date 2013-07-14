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

        render = function (character) {
            pc = new PlayableCharacter(character);
            return pc;
        };

    return {
        'render'  : render
    };
});
