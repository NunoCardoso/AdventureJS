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

        preload = function (pc, npcs) {
            var i, npc;
            _npcs = {};

            var charactersetup = _characters[pc.id];
            _pc = new Character(charactersetup);
            _pc.isPlayable = true;
            _pc.setLabel(pc.label);

            for (i in npcs) {
                charactersetup = _characters[npcs[i].id];
                npc = new Character(charactersetup);
                npc.isPlayable = false;
                npc.setLabel(npcs[i].label);
                _npcs[npcs[i].id] = npc;
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
