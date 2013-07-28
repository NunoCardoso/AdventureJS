/*global define, createjs, $ */

/**
 * This module bootstraps the game, preloads assets, then lands on the main menu
 */
define([
    'engine/achievement/main',
    'engine/character/main',
    'engine/condition/main',
    'engine/config',
    'engine/cursor/main',
    'engine/dialog/main',
    'engine/dialogoption/main',
    'engine/interaction/main',
    'engine/lib/keyboard',
    'engine/menu/main',
    'engine/object/main',
    'engine/panel/main',
    'engine/scene/main',
    'engine/sentence/main',
    'engine/settings',
    'engine/stage/main',
    'engine/start/main'
], function (
    gameachievement,
    gamecharacter,
    gamecondition,
    config,
    gamecursor,
    gamedialog,
    gamedialogoption,
    gameinteraction,
    keyboard,
    gamemenu,
    gameobject,
    gamepanel,
    gamescene,
    gamesentence,
    settings,
    gamestage,
    gamestart
) {
    var Game = function () {

        /**
         * asks gamemenu to render and display
         */

        var _game,
            _user,
            _assetList,

            setUser = function (user) {
                _user = user;
            },

            getUser = function () {
                return _user;
            },

            load = function (game) {
                _game = game;
            },

            init = function () {
                _assetList = settings.images.concat(settings.sounds);
                gamecharacter.init(settings.characters);
            },

            render = function (_scene) {
                var scene = gamescene.get(_scene);
                scene.render({
                    'pc_xy'    : {x : 200, y : 380}
                });

                gamescene.add(scene);
                gamestage.getInstance().switchScene(
                    'scene.start',
                    scene.name
                );
                keyboard.attachEvents();
                gamestage.activate();
                gamestage.update();
            },

            onAssetsLoaded = function (options) {
                gamecursor.preload();
                gamemenu.preload(_game.main);
                gamecharacter.preload(_game.pc, _game.npcs);
                gameobject.preload(_game.objects);
                gameinteraction.preload(_game.interactions);
                gamedialog.preload(_game.dialogs);
                gamedialogoption.preload(_game.dialogoptions);
                gamecondition.preload(_game.conditions);
                gamepanel.preload(_game.panel);
                gameachievement.preload(_game.achievements);
                gameachievement.setUser(getUser());
                gamescene.preload(_game.scenes);
                if (!options.scene) {
                    options.scene = 'scene.menu';
                }
                render(options.scene);
            },

            /**
             * call that starts the game.
             * Game is started by preloading images, then when done,
             * rendering the main menu
             */
            start = function (options) {
                var gameAssetList = _game.images.concat(_game.sounds);

                gamestage.preload();
                config.setCanvasXY({
                    x : $("#canvas").width(),
                    y : $("#canvas").height()
                });
                gamestart.init({
                    'assetList'      : _assetList.concat(gameAssetList),
                    'onAssetsLoaded' : onAssetsLoaded,
                    'onAssetsLoadedOptions' : options
                });
            };

        return {
            'init'    : init,
            'load'    : load,
            'start'   : start,
            'setUser' : setUser,
            'getUser' : getUser
        };
    };

    // tweak String prototype
    if (typeof String.prototype.startsWith !== 'function') {
        String.prototype.startsWith = function (str) {
            return this.slice(0, str.length) === str;
        };
    }
    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (str) {
            return this.slice(-str.length) === str;
        };
    }

    return Game;
});