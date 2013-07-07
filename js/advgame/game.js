/*global define, createjs, $ */

define([
    'advgame/mainmenu',
    'advgame/preload',
    'advgame/playablecharacter',
    'advgame/gamestage',
    'advgame/gameprops'
], function (mainMenu, preload, playablecharacter, gamestage, gameprops) {

    var game = function (options) {
        var o = options,
            queue,

            init = function () {
                gameprops.init();
                gamestage.init();
            },

            renderMainMenu = function () {
                console.log('Images loaded');
                mainMenu.renderMenu(o.main, queue);
                mainMenu.display();

// add the PC, for now
                playablecharacter.renderCharacter(o.pc, queue);
                playablecharacter.display();
            },

            /**
             * call that starts the game.
             * Game is started by preloading images, then when done,
             * rendering the main menu
             */
            start = function () {
                init();
                queue = preload.preloadImages({
                    images: o.images,
                    onComplete: renderMainMenu
                });
            };
        return {
            'start' : start
        };
    };
    return game;
});