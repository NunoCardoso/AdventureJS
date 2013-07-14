/*global define, createjs, $ */

/**
 * This is the
 */
define([
    'engine/assets',
    'engine/console/main',
    'engine/gameconfig'
], function (
    assets,
    gameconsole,
    gameconfig
) {
    var PlayableCharacter = function (options) {
        this.initialize(options);
    };

    PlayableCharacter.prototype = new createjs.BitmapAnimation();
    PlayableCharacter.prototype.PlayableCharacter_initialize = PlayableCharacter.prototype.initialize;
    PlayableCharacter.prototype.initialize = function (options) {

        this.spriteSheet = new createjs.SpriteSheet({
            images: [assets.getQueueLoaded().getResult(options.images)],
            frames: options.frames,
            animations: options.animations
        });

        this.x = 0;
        this.y = 0;
        this.clickedXY = null;
        this.name = options.name;
        this.speed = options.speed;
        this.attitude = 'standright';
        this.gotoAndPlay(this.attitude);

        this.setClickedXY = function (xy) {
            this.clickedXY = xy;
        };

        this.updatePosition = function () {
            // attitudes
            if (this.clickedXY) {
                if (this.x > this.clickedXY.x && (this.x - this.clickedXY.x > this.speed)) {
                    this.attitude = "walkleft";
                } else if (this.x < this.clickedXY.x  && (this.clickedXY.x - this.x > this.speed)) {
                    this.attitude = "walkright";
                } else {
                    if (this.attitude === "walkleft") {
                        this.attitude = "standleft";
                    } else if (this.attitude === "walkright") {
                        this.attitude = "standright";
                    }
                }
            }
            if (this.attitude === "walkleft") {
                this.x -= this.speed;
            } else if (this.attitude === "walkright") {
                this.x += this.speed;
            }

            // change attitude only if it is different
            if (this.currentAnimation !== this.attitude) {
                this.gotoAndPlay(this.attitude);
            }
        };


        this.onCharacterMouseOver = function (e) {
            gameconsole.get().sentence.text = gameconsole.get().sentence.lockedVerb.text + ' ' + e.target.name;
        };

        this.onCharacterMouseOut = function (e) {
            gameconsole.get().sentence.text = gameconfig.get('console.sentence.defaultText');
        };

        this.addEventListener("mouseover", $.proxy(this.onCharacterMouseOver, this));
        this.addEventListener("mouseout", $.proxy(this.onCharacterMouseOut, this));
    };
    return PlayableCharacter;
});