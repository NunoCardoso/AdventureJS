/*global define, createjs, $ */

/**
 * This module bootstraps the game on the main menu
 */
define([
    'engine/mainmenu',
    'engine/assets',
    'engine/sounds',
    'engine/playablecharacter',
    'engine/gamestage',
    'engine/keyboard',
    'engine/console/main',
    'engine/start/background',
    'engine/start/progressbar',
    'engine/gameconfig'
], function (
	mainMenu,
	assets,
    sounds,
	playablecharacter,
	gamestage,
    keyboard,
    gameconsole,
    Background,
    ProgressBar,
    gameconfig
) {
    var game = function (options) {

        /**
         * asks mainMenu to render and display
         */
        var renderMainMenu = function (queue) {
                mainMenu.render(options.main);
                gameconsole.render(options.console);
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
                gamestage.init();

                // start Background
                var background = new Background({
                    x: 0,
                    y: 0,
                    w: gameconfig.get('game.w'),
                    h: gameconfig.get('game.h')
                }),

                    p = {
                        x : 20,
                        y : 20,
                        w : 200,
                        h : 20
                    },

                    total = options.images.length + options.sounds.length,
                    loaded = 0,
                    remaining = total,
                    w2 = parseInt(((loaded * p.w) / total), 10),

                    progressbarleft = new ProgressBar({
                        'x' : p.x,
                        'y' : p.y,
                        'w' : w2,
                        'h' : p.h
                    }, 'red'),

                    progressbarright = new ProgressBar({
                        'x' : p.x + w2,
                        'y' : p.y,
                        'w' : p.x + p.w,
                        'h' : p.h
                    }, 'white'),

                    startContainer = new createjs.Container();

                startContainer.name = "container.start";

                startContainer.addChild(
                    background,
                    progressbarright,
                    progressbarleft
                );

                gamestage.addChild(startContainer);
                gamestage.update();
                assets.preload({
                    assets     : options.images.concat(options.sounds),
                    onComplete : onAssetsLoaded
                });
            };

        return {
            'start' : start
        };
    };
    return game;
});