/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/gameconfig',
    'engine/assets'
], function (
    gameconfig,
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
        this.scaleX = gameconfig.get('game.w') / this.image.width;
        this.scaleY = gameconfig.get('game.h') / this.image.height;

        if (options.interactable && options.playableCharacter) {
            this.addEventListener("click", $.proxy(function (e) {
                options.playableCharacter.setClickedXY({x : e.stageX, y : e.stageY});
            }, this));
        }
    };
    return Background;
});
