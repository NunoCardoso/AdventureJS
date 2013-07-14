/*global define, createjs, $ */

/**
 * This module bootstraps the game on the main menu
 */
define([
    'engine/menu/main',
    'engine/assets',
    'engine/gamestage',
    'engine/keyboard',
    'engine/console/main',
    'engine/start/main',
    'engine/gameconfig'
], function (
	mainMenu,
	assets,
	gamestage,
    keyboard,
    gameconsole,
    gamestart,
    gameconfig
) {
    var game = function (options) {

        /**
         * asks mainMenu to render and display
         */
        var renderMainMenu = function (queue) {
                mainMenu.render(options.main);
                // now that main menu is rendered, clean the start container
                gamestage.removeChild(gamestage.getChildByName('container.start'));
                 // gameconsole.render(options.console);
                // add the PC, for now
                //playablecharacter.render(options.characters);
                // add tick listener
                keyboard.attachEvents();
                gamestage.activate();
            },

            onAssetsLoaded = function (queue) {
                console.log('Assets loaded');
                assets.setQueueLoaded(queue.target);
                renderMainMenu();
            },

            /**
             * call that starts the game.
             * Game is started by preloading images, then when done,
             * rendering the main menu
             */
            start = function () {

                var assetList = options.images.concat(options.sounds);
                gamestage.init();
                gamestart.init({
                    'assetList' : assetList,
                    'onAssetsLoaded' : onAssetsLoaded
                });
            };

        return {
            'start' : start
        };
    };
    return game;
});