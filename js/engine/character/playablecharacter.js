/*global define, createjs, $ */

/**
 * This is the
 */
define([
    'engine/assets',
    'engine/console/main',
    'engine/gameconfig',
    'engine/character/decisionmaker'
], function (
    assets,
    gameconsole,
    gameconfig,
    decisionmaker
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
        this.label = options.name;
        this.speed = options.speed;
        this.attitude = 'standright';
        this.gotoAndPlay(this.attitude);

        this.line = new createjs.Text("", "bold 24px the8bit", "#FFFFFF");
        this.line.textAlign = "center";
        this.line.textBaseline = "bottom";
        this.line.x = this.x;
        this.line.y = this.y;

        this.setX = function (x) {
            this.x = x;
            this.line.x = x;
        };

        this.setY = function (y) {
            this.y = y;
            this.line.y = y;
        };

        this.setClickedXY = function (xy) {
            this.clickedXY = xy;
        };

        this.getLine = function () {
            return this.line;
        };

        this.say = function (text) {
            this.line.text = text;
            // 0.1 sec per letter;
            var interv = text.length * 100;
            setTimeout(
                $.proxy(function () {
                    this.line.text = '';
                }, this),
                interv
            );
        };

        this.unsay = function (text) {
            this.line.text = '';
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
            gameconsole.getSentence().displayObject(e.target);
        };

        this.onCharacterMouseOut = function (e) {
            gameconsole.getSentence().undisplayObject();
        };

        this.onCharacterClick = function (e) {
            var result = gameconsole.getSentence().setObject(e.target);
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