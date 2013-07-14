/*global define, createjs, $ */

/**
 * This module bootstraps the game on the main menu
 */
define([
    'engine/menu/main',
    'engine/gamestage',
    'engine/keyboard',
    'engine/console/main',
    'engine/object/main',
    'engine/start/main',
    'engine/scene/main',
    'engine/character/main'
], function (
	mainMenu,
	gamestage,
    keyboard,
    gameconsole,
    gameobjects,
    gamestart,
    GameScene,
    gamecharacter
) {
    var game = function (game) {

        /**
         * asks mainMenu to render and display
         */
        var renderMainMenu = function (queue) {
                mainMenu.render(game.main);
                keyboard.attachEvents();
                gamestage.activate();
            },

            loadScenes = function () {
                var i;
                for (i = 0; i < game.scenes.length; i++) {
                    var gamescene = new GameScene(game.scenes[i]);
                    gamestage.stashScene(gamescene);
                }
            },

            loadConsole = function () {
                gamestage.stashConsole(
                    gameconsole.render(
                        game.console
                    )
                );
            },

            onAssetsLoaded = function () {
                // load items that are accessory to scenes
                gameobjects.load(game.objects);
            //    gamecharacter.load(game.playableCharacter);

                loadConsole();
                // load scenes after assets are loaded
                loadScenes();
                renderMainMenu();
            },

            /**
             * call that starts the game.
             * Game is started by preloading images, then when done,
             * rendering the main menu
             */
            start = function () {
                var assetList = game.images.concat(game.sounds);
                gamestage.init();
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