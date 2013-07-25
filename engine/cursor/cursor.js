/*global define, createjs, $*/

/**
 * This module renders a cursor
 */
define([
    'engine/lib/assets',
    'engine/character/main'
], function (
    assets,
    gamecharacter
) {
    var Cursor = function (options) {
        this.initialize(options);
    };

    var p = Cursor.prototype = new createjs.Bitmap();
    p.Cursor_initialize = p.initialize;
    p.initialize = function (options) {
        this.Cursor_initialize();

        this.image  = assets.getQueueLoaded().getResult('cursor01');
        this.regX   = this.image.width / 2;
        this.regY   = this.image.height / 2;

        this.doTestHit = function (items) {
            var i;

            for (i in items) {
                if (typeof items[i].testHit === 'function') {
                    items[i].testHit(this.x, this.y);
                }
                if (items[i].children) {
                    this.doTestHit(items[i].children);
                }
            }
        };

        this.update = function (stage, xy) {
            this.x = xy.x;
            this.y = xy.y;

            var i,
                interactables,
                panel,
                scene = stage.getCurrentScene();

            if (scene.isPlayable()) {
                // interactables should include
                // stage objects, exits and npcs.
                interactables = scene.getDynamicSceneChildrens();
                this.doTestHit(interactables);

                // panel can be accessed like this.
                panel = scene.getPanel();
                this.doTestHit(panel.children);
            }
        };

        this.doTestClick = function (scene, items) {
            var i;

            for (i in items) {
                if (typeof items[i].testClick === 'function') {
                    items[i].testClick(this.x, this.y, scene);
                }
                if (items[i].children) {
                    this.doTestClick(scene, items[i].children);
                }
            }
        };

        this.click = function (stage, xy) {
            this.x = xy.x;
            this.y = xy.y;

            var i,
                interactables,
                panel,
                scene = stage.getCurrentScene();

            if (scene.isPlayable()) {
                // interactables should include
                // stage objects, exits and npcs.
                interactables = scene.getDynamicSceneChildrens();
                this.doTestClick(scene, interactables);

                // panel can be accessed like this.
                panel = scene.getPanel();
                this.doTestClick(scene, panel.children);
            }
        };
    };
    return Cursor;
});
