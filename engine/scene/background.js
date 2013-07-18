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

    Background.prototype = new createjs.Bitmap();
    Background.prototype.Background_initialize = Background.prototype.initialize;
    Background.prototype.initialize = function (options) {
        this.Background_initialize();
        this.image  = assets.getQueueLoaded().getResult(options.background);
        this.scaleX = config.get('game.w') / this.image.width;
        this.scaleY = config.get('game.h') / this.image.height;

        /**
         * call this function so that this background
         * dispatches click events to the playable character
         */
        this.activateClickListener = function (playableCharacter) {
            this.addEventListener("click", $.proxy(function (e) {
                playableCharacter.setTargetXY({x : e.stageX, y : e.stageY});
                action.reset(e);
            }, this));
        };
    };
    return Background;
});
