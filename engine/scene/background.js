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

        this.activateClickListener = function (pc) {
            this.addEventListener("click", $.proxy(function (e) {
                pc.setTargetXY({x : e.stageX, y : e.stageY});
                action.reset(e);
            }, this));
        };
    };
    return Background;
});