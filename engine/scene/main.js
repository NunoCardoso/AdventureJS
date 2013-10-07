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

        _preloadMenu = function () {
            var menuscene = new GameScene({id: 'scene.menu'});
            var menu      = require('engine/menu/main').get();
            _[menu.name]  = menu;
        },

        preload = function (scenes) {
            var i;
            for (i = 0; i < scenes.length; i++) {
                _[scenes[i].id] = new GameScene(scenes[i]);
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
        },

        findSceneWithExit = function (exit) {
            var key;
            for (key in _) {
                if (_[key].hasExit && _[key].hasExit(exit)) {
                    return key;
                }
            }
            return undefined;
        };

    return {
        'preload' : preload,
        'get'     : get,
        'getAll'  : getAll,
        'add'     : add,
        'findSceneWithExit' : findSceneWithExit
    };
});
