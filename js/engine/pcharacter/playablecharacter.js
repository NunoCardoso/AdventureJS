/*global define, createjs, $ */

/**
 * This is the
 */
define([
    'engine/interaction/action',
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
        this.clickedXY = undefined;
        this.label = options.name;
        this.speed = options.speed;
        this.attitude = 'standright';
        this.gotoAndPlay(this.attitude);
        this.callback = undefined;

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
            // abort any callback to perform, as the current itinerary was changed
            this.callback = undefined;
        };

        this.resetClickedXY = function () {
            this.clickedXY = undefined;
        };

        this.getLine = function () {
            return this.line;
        };

        this.say = function (text) {
            // 0.1 sec per letter;
            var interv = text.length * 100;
            this.talk();
            this.line.say(text);
            setTimeout(
                $.proxy(function () {
                    this.unsay();
                }, this),
                interv
            );
        };

        this.unsay = function () {
            this.stand();
            this.line.unsay();
        };

        // this is a callback function to perform when the playable character
        // reaches the targeted place
        this.setWhenFinished = function (callback) {
            this.callback = callback;
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
                        // perform the callback action, since the character reached his destination;
                        if (this.callback) {
                            this.callback.call();
                        }
                    } else if (this.attitude === "walkright") {
                        this.attitude = "standright";
                        // perform the callback action, since the character reached his destination;
                        if (this.callback) {
                            this.callback.call();
                        }
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

        this.talk = function () {
            if (this.attitude === "walkleft" || this.attitude === "standleft") {
                this.attitude = 'talkleft';
            } else if (this.attitude === "walkright" || this.attitude === "standright") {
                this.attitude = 'talkright';
            }
        };

        this.stand = function () {
            if (this.attitude === "walkleft" || this.attitude === "talkleft") {
                this.attitude = 'standleft';
            } else if (this.attitude === "walkright" || this.attitude === "talkright") {
                this.attitude = 'standright';
            }
        };

        this.onCharacterMouseOver = function (e) {
            action.mouseOverPlayableCharacter(e);
        };

        this.onCharacterMouseOut = function (e) {
            action.mouseOutPlayableCharacter(e);
        };

        this.onCharacterClick = function (e) {
            var result = action.clickPlayableCharacter(e);
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