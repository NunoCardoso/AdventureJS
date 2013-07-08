/*global define, createjs, $ */

/**
 * This module bootstraps the game on the main menu
 */
define([
    'advgame/mainmenu',
    'advgame/images',
    'advgame/playablecharacter',
    'advgame/gamestage',
    'advgame/gameprops'
], function (
	mainMenu,
	images,
	playablecharacter,
	gamestage,
	gameprops
) {
    var game = function (options) {

        /**
         * asks mainMenu to render and display
         */
        var renderMainMenu = function (queue) {
                console.log('Images loaded');
                mainMenu.prepare(options.main, queue.target);
                mainMenu.render();

// add the PC, for now
                playablecharacter.prepare(options.characters, queue.target);
                playablecharacter.render();
            },

            /**
             * call that starts the game.
             * Game is started by preloading images, then when done,
             * rendering the main menu
             */
            start = function () {
                gameprops.init();
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