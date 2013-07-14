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
    gamescene,
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

            onAssetsLoaded = function () {

                gameobjects.load(game.objects);
                gamecharacter.load(game.playableCharacter);
                gameconsole.load(game.console);
                gamescene.load(game.scenes);
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