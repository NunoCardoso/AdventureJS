/*global define, createjs, $ */

/**
 * This module handles the playable character
 */
define([
    'engine/scene/scene'
], function (
    GameScene
) {

    var _ = {},

        load = function (scenes) {
            var i;
            for (i = 0; i < scenes.length; i++) {
                _['scene.' + scenes[i].id] = new GameScene(scenes[i]);
            }
        },

        get = function (key) {
            return _[key];
        },

        add = function (scene) {
            _[scene.name] = scene;
        };

    return {
        'load' : load,
        'get'  : get,
        'add'  : add
    };
});
