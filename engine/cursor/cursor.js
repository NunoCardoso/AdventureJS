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

        this.doTestDrag = function (scene, items) {
            var i, isHandled;

            for (i = items.length - 1; i >= 0; i--) {
                if (typeof items[i].testDrag === 'function') {
                    isHandled = items[i].testDrag(this.x, this.y, scene);
                    if (isHandled) {
                        return true;
                    }
                }
                if (items[i].children) {
                    isHandled = this.doTestDrag(scene, items[i].children);
                    if (isHandled) {
                        return true;
                    }
                }
            }
            return false;
        };

        this.doTestUndrag = function (scene, items) {
            var i, isHandled;

            for (i = items.length - 1; i >= 0; i--) {
                if (typeof items[i].testDrag === 'function') {
                    isHandled = items[i].testUndrag(this.x, this.y, scene);
                    if (isHandled) {
                        return true;
                    }
                }
                if (items[i].children) {
                    isHandled = this.doTestUndrag(scene, items[i].children);
                    if (isHandled) {
                        return true;
                    }
                }
            }
            return false;
        };

        this.doTestHit = function (items) {
            var i, isHandled;

            for (i = items.length - 1; i >= 0; i--) {
                if (typeof items[i].testHit === 'function') {
                    isHandled = items[i].testHit(this.x, this.y);
                    if (isHandled) {
                        return true;
                    }
                }
                if (items[i].children) {
                    isHandled = this.doTestHit(items[i].children);
                    if (isHandled) {
                        return true;
                    }
                }
            }
            return false;
        };

        this.doTestClick = function (scene, items) {
            var i, isHandled;

            // from the foreground to the background
            // This only triggers the click on the item on top.
            // this is why it is important to leave the background as
            // the first thing on the container
            for (i = items.length - 1; i >= 0; i--) {
                if (typeof items[i].testClick === 'function') {
                    isHandled = items[i].testClick(this.x, this.y, scene);
                    if (isHandled) {
                        return true;
                    }
                }
                if (items[i].children) {
                    isHandled = this.doTestClick(scene, items[i].children);
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

        this.doTest = function (event, scene, menu) {
            var isHandled;
            switch (event) {
            case 'click':
                isHandled = this.doTestClick(scene, menu);
                break;
            case 'hover':
                isHandled = this.doTestHit(menu);
                break;
            case 'drag':
                isHandled = this.doTestDrag(scene, menu);
                break;
            case 'undrag':
                isHandled = this.doTestUndrag(scene, menu);
                break;
            }
            return isHandled;
        };

        this.update = function (stage, xy, event) {
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
                    menu = scene.getMenuButton();
                    isHandled = this.doTest(event, scene, menu);
                    if (isHandled) {
                        return;
                    }

                    interactables = scene.getDynamicBackSceneChildrens();
                    isHandled = this.doTest(event, scene, interactables);
                    if (isHandled) {
                        return;
                    }

                    interactables = scene.getDynamicForeSceneChildrens();
                    isHandled =  this.doTest(event, scene, interactables);
                    if (isHandled) {
                        return;
                    }
                }

                // panel can be accessed like this.
                panel = scene.getPanel().children;
                return this.doTest(event, scene, panel);
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
