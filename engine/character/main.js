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
        characters,

        initCharacters = function (_characters) {
            characters = _characters;
        },

        _find = function (id) {
            var i;
            for (i = 0; i < characters.length; i++) {
                if (characters[i].id === id) {
                    return characters[i];
                }
            }
        },

        preload = function (playableCharacter, nonPlayableCharacters) {
            var i, _npc;

            npc = {};

            // playableCharacter has the id reference to a character
            pc = new PlayableCharacter(_find(playableCharacter.id));
            pc.setLabel(playableCharacter.label);

            for (i = 0; i < nonPlayableCharacters.length; i++) {
                _npc = new NonPlayableCharacter(_find(nonPlayableCharacters[i].id));
                _npc.setLabel(nonPlayableCharacters[i].label);
                npc[nonPlayableCharacters[i].id] = _npc;
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
        'initCharacters'            : initCharacters,
        'preload'                   : preload,
        'getPlayableCharacter'      : getPlayableCharacter,
        'getNonPlayableCharacters'  : getNonPlayableCharacters,
        'updatePosition'            : updatePosition
    };
});
