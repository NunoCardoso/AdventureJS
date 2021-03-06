/*global define, createjs, $ */

/**
 * This is the balloon over character heads
 */
define([
    'engine/config',
    'engine/lib/assets'
], function (
    config,
    assets
) {
    var Sprite = function (options) {
        this.initialize(options);
    };

    var p = Sprite.prototype = new createjs.Sprite();
    p.Sprite_initialize = p.initialize;
    p.initialize = function (options) {
        this.Sprite_initialize();

        this.spriteSheet = new createjs.SpriteSheet({
            images     : [assets.getQueueLoaded().getResult(options.images)],
            frames     : options.frames,
            animations : options.animations
        });
        this.frames   = options.frames;
        this.attitude = 'standright';
        this.saltAttitude = this.attitude;
        this.gotoAndPlay(this.saltAttitude);

        this.isStandingLeft = function () {
            return this.attitude === "standleft";
        };

        this.isStandingRight = function () {
            return this.attitude === "standright";
        };

        this.isWalkingLeft = function () {
            return this.attitude === "walkleft" ||
                   this.attitude === "walkupleft" ||
                   this.attitude === "walkdownleft";
        };

        this.isWalkingRight = function () {
            return this.attitude === "walkright" ||
                   this.attitude === "walkupright" ||
                   this.attitude === "walkdownright";
        };

        this.isFacingLeft = function () {
            return this.attitude === "walkleft" ||
                   this.attitude === "walkupleft" ||
                   this.attitude === "walkdownleft" ||
                   this.attitude === "standleft" ||
                   this.attitude === 'talkleft';
        };

        this.isFacingRight = function () {
            return this.attitude === "walkright" ||
                   this.attitude === "walkupright" ||
                   this.attitude === "walkdownright" ||
                   this.attitude === "standright" ||
                   this.attitude === 'talkright';
        };

        this.isTalking = function () {
            return this.attitude === "talkright" ||
                   this.attitude === "talkleft";
        };

        this.getStandAttitude = function () {
            if (this.isFacingLeft()) {
                return 'standleft';
            }
            if (this.isFacingRight()) {
                return 'standright';
            }
        };

    };
    return Sprite;
});