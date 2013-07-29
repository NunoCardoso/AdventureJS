/*global define, createjs, $*/

/**
 * This module renders a scene background
 */
define([
    'engine/config',
    'engine/interaction/action',
    'engine/lib/assets'
], function (
    config,
    action,
    assets
) {
    var Background = function (options) {
        this.initialize(options);
    };

    var p = Background.prototype = new createjs.Bitmap();
    p.Background_initialize = p.initialize;
    p.initialize = function (options) {
        this.Background_initialize();

        this.image  = assets.getQueueLoaded().getResult(options.background);
        this.mode = options.backgroundmode;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;

        this.dragXY = undefined;

        if (this.mode === 'fit') {
            this.scaleX = config.get('game.w') / this.image.width;
            this.scaleY = config.get('game.h') / this.image.height;
            this.w = config.get('game.w');
            this.h = config.get('game.h');
        } else {
            this.scaleX = 1;
            this.scaleY = config.get('game.h') / this.image.height;
            this.w = this.image.width;
            this.h = this.image.height;
        }

        this.testDrag = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseHit = this.hitTest(coords.x, coords.y);
            if (mouseHit) {
                require('engine/cursor/main').changeTo('image.cursor.drag');
                if (this.dragXY) {
                    var diffX = x - this.dragXY.x;
                    scene.move(diffX);
                }
                this.dragXY = this.dragXY = {x: x, y: y};
                return true;
            }
            return false;
        };

        this.testUndrag = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseHit = this.hitTest(coords.x, coords.y);
            if (mouseHit) {
                require('engine/cursor/main').changeTo('image.cursor.drag');
                if (this.dragXY) {
                    this.dragXY = undefined;
                }
                return true;
            }
            return false;
        };

        this.testClick = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseClick = this.hitTest(coords.x, coords.y);
            if (mouseClick) {
                scene.getPc().setTargetXY({x : x, y : y});
                action.reset();
                return true;
            }
            return false;
        };
    };
    return Background;
});