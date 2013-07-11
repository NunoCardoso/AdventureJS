/*global define, createjs, $ */

/**
 * This module bootstraps the game on the main menu
 */
define([
    'engine/mainmenu',
    'engine/images',
    'engine/playablecharacter',
    'engine/gamestage',
    'engine/gameconsole'
], function (
	mainMenu,
	images,
	playablecharacter,
	gamestage,
    gameconsole
) {
    var game = function (options) {

        /**
         * asks mainMenu to render and display
         */
        var renderMainMenu = function (queue) {
                console.log('Images loaded');
                images.setQueueLoaded(queue.target);
                mainMenu.render(options.main);
                gameconsole.render(options.console);
                // add the PC, for now
                playablecharacter.render(options.characters);
                // add tick listener
                gamestage.activate();
            },

            /**
             * call that starts the game.
             * Game is started by preloading images, then when done,
             * rendering the main menu
             */
            start = function () {
                gamestage.init();
                images.preload({
                    images: options.images,
                    onComplete: renderMainMenu
                });
            };

        return {
            'start' : start
        };
    };
    return game;
});