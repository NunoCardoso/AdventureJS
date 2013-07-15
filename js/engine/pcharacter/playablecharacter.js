/*global define, createjs, $ */

/**
 * This is the
 */
define([
    'engine/console/action',
    'engine/lib/assets',
    'engine/pcharacter/decisionmaker',
    'engine/pcharacter/line'
], function (
    action,
    assets,
    decisionmaker,
    TextLine
) {
    var PlayableCharacter = function (options) {
        this.initialize(options);
    };

    PlayableCharacter.prototype = new createjs.BitmapAnimation();
    PlayableCharacter.prototype.PlayableCharacter_initialize = PlayableCharacter.prototype.initialize;
    PlayableCharacter.prototype.initialize = function (options) {

        this.spriteSheet = new createjs.SpriteSheet({
            images     : [
                assets.getQueueLoaded().getResult(options.images)
            ],
            frames     : options.frames,
            animations : options.animations
        });

        this.x = 0;
        this.y = 0;
        this.clickedXY = null;
        this.label = options.name;
        this.speed = options.speed;
        this.attitude = 'standright';
        this.gotoAndPlay(this.attitude);

        /** speech line */
        this.line = new TextLine({});

        this.setX = function (x) {
            this.x = x;
            this.line.setX(x);
        };

        this.setY = function (y) {
            this.y = y;
            this.line.setY(y);
        };

        this.setClickedXY = function (xy) {
            this.clickedXY = xy;
        };

        this.getLine = function () {
            return this.line;
        };

        this.say = function (text) {
            this.line.say(text);
        };

        this.unsay = function (text) {
            this.line.unsay(text);
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
                this.setX(this.x - this.speed);
            } else if (this.attitude === "walkright") {
                this.setX(this.x + this.speed);
            }

            // change attitude only if it is different
            if (this.currentAnimation !== this.attitude) {
                this.gotoAndPlay(this.attitude);
            }
        };

        this.onCharacterMouseOver = function (e) {
            action.mouseOverPlayableCharacter(e.target);
        };

        this.onCharacterMouseOut = function (e) {
            action.mouseOutPlayableCharacter(e.target);
        };

        this.onCharacterClick = function (e) {
            var result = action.clickPlayableCharacter(e.target);
            if (result) {
                // use decisionmaker;
                this.say(result.text);
            }
        };

        this.addEventListener("mouseover", $.proxy(this.onCharacterMouseOver, this));
        this.addEventListener("mouseout",  $.proxy(this.onCharacterMouseOut, this));
        this.addEventListener("click",     $.proxy(this.onCharacterClick, this));
    };
    return PlayableCharacter;
});