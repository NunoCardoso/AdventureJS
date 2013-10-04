/*global define, createjs, $*/

/**
 * This module renders a cursor
 */
define([
    'engine/lib/assets',
    'engine/config',
    'engine/character/main'
], function (
    assets,
    config,
    gamecharacter
) {
    var Cursor = function (options) {
        this.initialize(options);
    };

    var p = Cursor.prototype = new createjs.Bitmap();
    p.Cursor_initialize = p.initialize;
    p.initialize = function (options) {
        this.Cursor_initialize();

        this.gameBoundsY = config.get('game.h');
        this.busy = false;

        this.doTest = function (event, scene, items, role) {
            var i, isHandled;

            // from the foreground to the background
            // This only triggers the click on the item on top.
            // this is why it is important to leave the background as
            // the first thing on the container
            for (i = items.length - 1; i >= 0; i--) {
                if (typeof items[i].test === 'function') {
                    isHandled = items[i].test(this.x, this.y, event, scene, role);
                    if (isHandled) {
                        return true;
                    }
                }
                if (items[i].children) {
                    isHandled = this.doTest(event, scene, items[i].children, role);
                    if (isHandled) {
                        return true;
                    }
                }
            }
            return false;
        };

        this.clickedOnGame = function (xy) {
            return xy.y <= this.gameBoundsY;
        };

        this.update = function (stage, xy, event, role) {
            this.x = xy.x;
            this.y = xy.y;

            // do no update on cursor, if he is busy;
            if (this.busy) {
                return;
            }

            var i,
                interactables,
                panel,
                menu,
                isHandled,
                scene = stage.getCurrentScene();

            if (scene.isPlayable()) {
                // interactables should include
                // stage objects, exits and npcs.
                if (this.clickedOnGame(xy)) {
                    if (role !== 'editor') {
                        menu = scene.getMenuButton();
                        isHandled = this.doTest(event, scene, menu, role);
                        if (isHandled) {
                            return;
                        }
                        help = scene.getHelpButton();
                        isHandled = this.doTest(event, scene, help, role);
                        if (isHandled) {
                            return;
                        }
                    }

                    interactables = scene.getDynamicForeSceneChildrens();
                    isHandled =  this.doTest(event, scene, interactables, role);
                    if (isHandled) {
                        return;
                    }
                    
                    interactables = scene.getDynamicBackSceneChildrens();
                    isHandled = this.doTest(event, scene, interactables, role);
                    if (isHandled) {
                        return;
                    }

                }

                if (role !== 'editor') {
                    // panel can be accessed like this.
                    panel = scene.getPanel().children;
                    return this.doTest(event, scene, panel, role);
                }
            }
        };

        this.changeTo = function (what) {
            this.image  = assets.getQueueLoaded().getResult(what);
            this.regX   = this.image.width  / 2;
            this.regY   = this.image.height / 2;
        };

        this.reset = function () {
            this.changeTo('image.cursor.default');
        };

        this.reset();
    };
    return Cursor;
});
