/*global define, createjs, $ */

/**
 * This module bootstraps the game, preloads assets, then lands on the main menu
 */
define([
    'engine/character/main',
    'engine/condition/main',
    'engine/config',
    'engine/cursor/main',
    'engine/dialog/main',
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
    gamecharacter,
    gamecondition,
    config,
    gamecursor,
    gamedialog,
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

        var game,
            assetList,

            load = function (_game) {
                game = _game;
            },

            init = function () {
                assetList = settings.images.concat(settings.sounds);
                gamecharacter.initCharacters(settings.characters);
            },

            render = function (_scene) {
                var scene = gamescene.get('scene.' + _scene);
                scene.render({
                    'playableCharacter'     : gamecharacter.getPlayableCharacter(),
                    'nonPlayableCharacters' : gamecharacter.getNonPlayableCharacters(),
                    'panel'                 : gamepanel.get(),
                    'sentence'              : gamesentence.get(),
                    'characterPosition'     : {x : 200, y : 230}
                });

                gamescene.add(scene);
                gamestage.getInstance().switchScene(
                    'scene.start',
                    scene.name
                );
                keyboard.attachEvents();
                gamestage.activateMouseAndTouch();
                gamestage.update();
            },

            onAssetsLoaded = function (options) {
                gamecursor.preload();
                gamemenu.preload(game.main);
                gamecharacter.preload(game.pc, game.npcs);
                gameobject.preload(game.objects);
                gameinteraction.preload(game.interactions);
                gamedialog.preload(game.dialogs);
                gamecondition.preload(game.conditions);
                gamepanel.preload(game.panel);
                gamescene.preload(game.scenes);
                if (!options.scene) {
                    options.scene = 'menu';
                }
                render(options.scene);
            },

            /**
             * call that starts the game.
             * Game is started by preloading images, then when done,
             * rendering the main menu
             */
            start = function (options) {
                var gameAssetList = game.images.concat(game.sounds);

                gamestage.preload();
                config.setCanvasXY({
                    x : $("#canvas").width(),
                    y : $("#canvas").height()
                });
                gamestart.init({
                    'assetList'      : assetList.concat(gameAssetList),
                    'onAssetsLoaded' : onAssetsLoaded,
                    'onAssetsLoadedOptions' : options
                });
            };

        return {
            'init'  : init,
            'load'  : load,
            'start' : start
        };
    };
    return Game;
});