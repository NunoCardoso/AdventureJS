/*global define */

/**
 * This module handles the playable character
 */
define([
    'engine/character/nonplayablecharacter',
    'engine/character/playablecharacter'
], function (
    NonPlayableCharacter,
    PlayableCharacter
) {
    var pc,
        npc,

        preload = function (playableCharacter, nonPlayableCharacters) {
            var i, _npc;
            pc = new PlayableCharacter(playableCharacter);
            npc = {};
            for (i = 0; i < nonPlayableCharacters.length; i++) {
                _npc = nonPlayableCharacters[i];
                npc[_npc.id] = new NonPlayableCharacter(_npc);
            }
        },

        getPlayableCharacter = function () {
            return pc;
        },

        getNonPlayableCharacters = function () {
            return npc;
        },

        updatePosition = function () {
            if (pc) {
                pc.updatePosition();
            }
        };

    return {
        'preload'                 : preload,
        'getPlayableCharacter'    : getPlayableCharacter,
        'getNonPlayableCharacters': getNonPlayableCharacters,
        'updatePosition'          : updatePosition
    };
});
