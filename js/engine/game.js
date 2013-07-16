/*global define, createjs, $ */

/**
 * This module bootstraps the game, preloads assets, then lands on the main menu
 */
define([
    'engine/config',
    'engine/interaction/main',
    'engine/lib/keyboard',
    'engine/menu/main',
    'engine/object/main',
    'engine/panel/main',
    'engine/pcharacter/main',
    'engine/scene/main',
    'engine/stage/main',
    'engine/start/main'
], function (
    config,
    gameinteraction,
    keyboard,
    gamemenu,
    gameobject,
    gamepanel,
    playablecharacter,
    gamescene,
    gamestage,
    gamestart
) {
    var game = function (game) {

        /**
         * asks gamemenu to render and display
         */
        var renderGameMenu = function (queue) {

                var scene = gamescene.newScene({id: 'menu'}); // scene name wil be scene.menu
                scene = gamemenu.render(game.main, scene);
                gamescene.add(scene);
                gamestage.getInstance().switchScene(
                    'scene.start',
                    scene.name
                );
                keyboard.attachEvents();
                gamestage.activate();
            },

            onAssetsLoaded = function () {
                gameobject.preload(game.objects);
                gameinteraction.preload(game.interactions);
                playablecharacter.preload(game.playableCharacter);
                gamepanel.preload(game.panel);
                gamescene.preload(game.scenes);
                renderGameMenu();
            },

            /**
             * call that starts the game.
             * Game is started by preloading images, then when done,
             * rendering the main menu
             */
            start = function () {
                var assetList = game.images.concat(game.sounds);
                gamestage.preload();
                config.setCanvasXY({
                    x : $("#canvas").width(),
                    y : $("#canvas").height()
                });
                gamestart.init({
                    'assetList'      : assetList,
                    'onAssetsLoaded' : onAssetsLoaded
                });
            };

        return {
            'start' : start
        };
    };
    return game;
});