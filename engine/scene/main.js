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

        newScene = function (options) {
            return new GameScene(options);
        },

        _preloadMenu = function () {
            var menuscene = newScene({id: 'menu'});
            var menu = require('engine/menu/main').get();
            _[menu.name] = menu;
        },

        preload = function (scenes) {
            var i;
            for (i = 0; i < scenes.length; i++) {
                _['scene.' + scenes[i].id] = new GameScene(scenes[i]);
            }
            _preloadMenu();
        },

        get = function (key) {
            return _[key];
        },

        getAll = function () {
            return _;
        },

        add = function (scene) {
            _[scene.name] = scene;
        };

    return {
        'preload' : preload,
        'get'     : get,
        'getAll'  : getAll,
        'newScene': newScene,
        'add'     : add
    };
});
