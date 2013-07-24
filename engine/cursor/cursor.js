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

    Cursor.prototype = new createjs.Bitmap();
    Cursor.prototype.Cursor_initialize = Cursor.prototype.initialize;
    Cursor.prototype.initialize = function (options) {
        this.Cursor_initialize();
        this.image  = assets.getQueueLoaded().getResult('cursor01');
        this.regX = this.image.width / 2;
        this.regY = this.image.height / 2;

        this.updatePosition = function (stage, xy) {
            this.x = xy.x;
            this.y = xy.y;
            var npcs, i, key;

            npcs = gamecharacter.getNonPlayableCharacters();

            for (key in npcs) {
                npcs[key].testHit(this.x, this.y);
            }
            var objects,
                scene = stage.getCurrentScene();
            if (typeof scene.getObjectsOnScene === 'function') {
                objects = scene.getObjectsOnScene();
                for (i in objects) {
                    objects[i].testHit(this.x, this.y);
                }
            }

            //exits,

            //verbs,
            //invbentories
        };
    };
    return Cursor;
});
