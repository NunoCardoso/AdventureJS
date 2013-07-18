/*global define */

/**
 * This module stores game scenes
 */
define([
    'engine/scene/scene'
], function (
    GameScene
) {

    var _ = {},

        preload = function (scenes) {
            var i;
            for (i = 0; i < scenes.length; i++) {
                _['scene.' + scenes[i].id] = new GameScene(scenes[i]);
            }
        },

        get = function (key) {
            return _[key];
        },

        newScene = function (options) {
            return new GameScene(options);
        },

        add = function (scene) {
            _[scene.name] = scene;
        };

    return {
        'preload' : preload,
        'get'     : get,
        'newScene': newScene,
        'add'     : add
    };
});
