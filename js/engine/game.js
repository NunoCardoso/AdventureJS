/*global define, createjs, $ */

/**
 * This module bootstraps the game on the main menu
 */
define([
    'engine/mainmenu',
    'engine/images',
    'engine/sounds',
    'engine/playablecharacter',
    'engine/gamestage',
    'engine/keyboard',
    'engine/console/main'
], function (
	mainMenu,
	images,
    sounds,
	playablecharacter,
	gamestage,
    keyboard,
    gameconsole
) {
    var game = function (options) {

        /**
         * asks mainMenu to render and display
         */
        var renderMainMenu = function (queue) {
                mainMenu.render(options.main);
                gameconsole.render(options.console);
                // add the PC, for now
                playablecharacter.render(options.characters);
                // add tick listener
                keyboard.attachEvents();
                gamestage.activate();
            },

            onSoundsLoaded = function (queue) {
                console.log('Sounds loaded');
                renderMainMenu();
            },

            onImagesLoaded = function (queue) {
                console.log('Images loaded');
                images.setQueueLoaded(queue.target);
                sounds.preload({
                    sounds: options.sounds,
                    onComplete: onSoundsLoaded
                });
            },

            /**
             * call that starts the game.
             * Game is started by preloading images, then when done,
             * rendering the main menu
             */
            start = function () {
                gamestage.init();
                if (!createjs.Sound.initializeDefaultPlugins()) { return; }
                images.preload({
                    images: options.images,
                    onComplete: onImagesLoaded
                });
            };

        return {
            'start' : start
        };
    };
    return game;
});