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
        this.label = options.name;

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
        this.line = new TextLine({});

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
            action.mouseOverNonPlayableCharacter(e);
        };

        this.onCharacterMouseOut = function (e) {
            action.mouseOutNonPlayableCharacter(e);
        };

        this.activateClickListener = function (playableCharacter) {
            this.addEventListener("click", $.proxy(function (e) {
                playableCharacter.setClickedXY({x : e.stageX, y : e.stageY});
                playableCharacter.setWhenFinished(function () {
                    var result = action.clickNonPlayableCharacter(e);
                    if (result) {
                        playableCharacter.say(result.text);
                    }
                });
            }, this));
        };

        this.addEventListener("mouseover", $.proxy(this.onCharacterMouseOver, this));
        this.addEventListener("mouseout",  $.proxy(this.onCharacterMouseOut, this));
    };
    return NonPlayableCharacter;
});