/*global define, createjs, $ */

/**
 * This is the
 */
define([
    'engine/interaction/action',
    'engine/lib/assets',
    'engine/character/line'
], function (
    action,
    assets,
    TextLine
) {
    var NonPlayableCharacter = function (options) {
        this.initialize(options);
    };

    NonPlayableCharacter.prototype = new createjs.BitmapAnimation();
    NonPlayableCharacter.prototype.NonPlayableCharacter_initialize = NonPlayableCharacter.prototype.initialize;
    NonPlayableCharacter.prototype.initialize = function (options) {

        this.name = 'character.' + options.id;
        this.label = options.label;
        this.frames = options.frames;

        this.spriteSheet = new createjs.SpriteSheet({
            images     : [
                assets.getQueueLoaded().getResult(options.images)
            ],
            frames     : options.frames,
            animations : options.animations
        });

        this.x = 0;
        this.y = 0;

        this.attitude = 'standleft';
        this.gotoAndPlay(this.attitude);

        /** speech line */
        this.line = new TextLine({color: '#FF0000'});

        this.getDimensions = function () {
            return {
                'x1' : this.x - this.frames.regX,
                'x2' : this.x + this.frames.width - this.regX,
                'y1' : this.y - this.frames.regY,
                'y2' : this.y + this.frames.height - this.regY
            };
        };

        this.setX = function (x) {
            this.x = x;
            this.line.setX(x);
        };

        this.setY = function (y) {
            this.y = y;
            this.line.setY(y);
        };

        this.getLine = function () {
            return this.line;
        };

        this.say = function (text, callback) {
            // 0.1 sec per letter;
            var interv = text.length * 100;
            this.talk();
            this.line.say(text);
            setTimeout(
                $.proxy(function () {
                    this.shutUp();
                    if (typeof callback === 'function') {
                        callback.call();
                    }
                }, this),
                interv
            );
        };

        this.shutUp = function () {
            this.stand();
            this.line.shutUp();
        };

        this.talk = function () {
            if (this.attitude === "walkleft" || this.attitude === "standleft") {
                this.attitude = 'talkleft';
            } else if (this.attitude === "walkright" || this.attitude === "standright") {
                this.attitude = 'talkright';
            }
            this.gotoAndPlay(this.attitude);

        };

        this.stand = function () {
            if (this.attitude === "walkleft" || this.attitude === "talkleft") {
                this.attitude = 'standleft';
            } else if (this.attitude === "walkright" || this.attitude === "talkright") {
                this.attitude = 'standright';
            }
            this.gotoAndPlay(this.attitude);
        };

        this.faceTo = function (other) {
            if (this.x < other.x) {
                this.attitude = 'standright';
                this.gotoAndPlay(this.attitude);
            } else {
                this.attitude = 'standleft';
                this.gotoAndPlay(this.attitude);
            }
        };

        this.onCharacterMouseOver = function (e) {
            action.mouseOverNonPlayableCharacter(e);
        };

        this.onCharacterMouseOut = function (e) {
            action.mouseOutNonPlayableCharacter(e);
        };

        this.activateClickListener = function (playableCharacter) {
            this.addEventListener("click", $.proxy(function (e) {
                playableCharacter.actForNonPlayableCharacterClick(e, this);
            }, this));
        };

        this.addEventListener("mouseover", $.proxy(this.onCharacterMouseOver, this));
        this.addEventListener("mouseout",  $.proxy(this.onCharacterMouseOut, this));
    };
    return NonPlayableCharacter;
});