/*global define */

/**
 * This module handles characters of the game
 */
define([
    'engine/character/character'
], function (
    Character
) {
    var _pc,
        _npcs,
        _characters = {},

        init = function (characters) {
            var i;
            for (i in characters) {
                _characters[characters[i].id] = characters[i];
            }
        },

        preload = function (playableCharacter, nonPlayableCharacters) {
            var i, npc;
            _npcs = {};

            // playableCharacter has the id reference to a character
            var charactersetup = _characters[playableCharacter.id];
            _pc = new Character(charactersetup);
            _pc.isPlayable = true;
            _pc.setLabel(playableCharacter.label);

            for (i in nonPlayableCharacters) {
                charactersetup = _characters[nonPlayableCharacters[i].id];
                npc = new Character(charactersetup);
                npc.isPlayable = false;
                npc.setLabel(nonPlayableCharacters[i].label);
                _npcs[nonPlayableCharacters[i].id] = npc;
            }
        },

        getPc = function () {
            return _pc;
        },

        getNpcs = function () {
            return _npcs;
        },

        update = function (scene) {
            if (_pc) {
                _pc.update(scene);
            }
        };

    return {
        'init'    : init,
        'preload' : preload,
        'getPc'   : getPc,
        'getNpcs' : getNpcs,
        'update'  : update
    };
});
