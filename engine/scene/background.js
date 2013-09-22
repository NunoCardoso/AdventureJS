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

    var p = Background.prototype = new createjs.Container();
    p.Background_initialize = p.initialize;
    p.initialize = function (options) {
        this.Background_initialize();

        this.name = 'background';
        this.image  = new createjs.Bitmap();
        this.image.image = assets.getQueueLoaded().getResult(options.background);
        this.addChild(this.image);

        this.mode = options.backgroundmode;

        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;

        this.dragXY = undefined;
        this.path = undefined;

        if (options.backgroundpath) {
            this.path = new createjs.Bitmap();
            this.path.alpha = 0.5;
            this.path.image = assets.getQueueLoaded().getResult(options.backgroundpath);
            this.addChild(this.path);
        }

        /* fit will make the background to fit the stage area. No overflow. */
        if (this.mode === 'fit') {
            this.image.scaleX = config.get('game.w') / this.image.image.width;
            this.image.scaleY = config.get('game.h') / this.image.image.height;
            if (this.path) {
                this.path.scaleX = config.get('game.w') / this.path.image.width;
                this.path.scaleY = config.get('game.h') / this.path.image.height;
            }
            this.w = config.get('game.w');
            this.h = config.get('game.h');

        // fit Y, get the scale, then apply it to X.
        } else if (this.mode === 'overflow') {
            this.image.scaleY = config.get('game.h') / this.image.image.height;
            this.image.scaleX = this.image.scaleY;

            // path size is not the size of the background image
            if (this.path) {
                this.path.scaleY = config.get('game.h') / this.path.image.height;
                this.path.scaleX = this.path.scaleY * this.image.image.width / this.path.image.width;

            }
            this.w = this.image.image.width;
            this.h = this.image.image.height;
        }

        this.test = function (x, y, event, scene, role) {
            var coords = this.globalToLocal(x, y),
                mine   = this.hitTest(coords.x, coords.y);

            switch (event) {
            case 'drag':
                if (mine) {
                    require('engine/cursor/main').changeTo('image.cursor.drag');
                    if (this.dragXY) {
                        var diffX = x - this.dragXY.x;
                        scene.move(diffX);
                    }
                    this.dragXY = {x: x, y: y};
                    return true;
                }
                return false;
            case 'undrag':
                if (mine) {
                    this.dragXY = undefined;
                    return true;
                }
                return false;
            case 'click':
                if (mine) {
                    scene.getPc().setTargetXY({x : x, y : y});
                    action.reset();
                    return true;
                }
                return false;
            default:
                return false;
            }
        };
    };
    return Background;
});