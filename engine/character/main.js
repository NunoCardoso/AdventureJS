/*global define */

/**
 * This module handles the playable character
 */
define([
    'engine/character/character'
], function (
    Character
) {
    var pc,
        npcs,
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
            var i, npc;
            npcs = {};

            // playableCharacter has the id reference to a character
            var charactersetup = _find(playableCharacter.id);
            pc = new Character(charactersetup);
            pc.isPlayable = true;
            pc.setLabel(playableCharacter.label);

            for (i = 0; i < nonPlayableCharacters.length; i++) {
                charactersetup = _find(nonPlayableCharacters[i].id);
                npc = new Character(charactersetup);
                npc.isPlayable = false;
                npc.setLabel(nonPlayableCharacters[i].label);
                npcs[nonPlayableCharacters[i].id] = npc;
            }
        },

        getPlayableCharacter = function () {
            return pc;
        },

        getNonPlayableCharacters = function () {
            return npcs;
        },

        updatePosition = function (scene) {
            if (pc) {
                pc.updatePosition(scene);
            }
        };

    return {
        'initCharacters'           : initCharacters,
        'preload'                  : preload,
        'getPlayableCharacter'     : getPlayableCharacter,
        'getNonPlayableCharacters' : getNonPlayableCharacters,
        'updatePosition'           : updatePosition
    };
});
