/*global define, createjs, $ */

/**
 * This is the
 */
define([
    'engine/interaction/action',
    'engine/lib/assets',
    'engine/character/line',
    'engine/dialog/main'
], function (
    action,
    assets,
    TextLine,
    gamedialog
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
        this.frames = options.frames;
        this.w = this.frames.width;
        this.h = this.frames.height;

        this.name = 'character.' + options.id;
        this.targetXY = undefined;
        this.label = undefined;
        this.speed = options.speed;
        this.attitude = 'standright';
        this.gotoAndPlay(this.attitude);
        this.callback = undefined;

        /** speech line */
        this.line = new TextLine({});

        this.setLabel = function (label) {
            this.label = label;
        };

        this.setX = function (x) {
            this.x = x;
            this.line.setX(x);
        };

        this.setY = function (y) {
            this.y = y;
            this.line.setY(y);
        };

        this.setTargetXY = function (xy) {
            this.targetXY = xy;
            // abort any callback to perform, as the current itinerary was changed
            this.callback = undefined;
        };

        // mouse position click can be the target click on most ocations,
        // but if we clicked on items/characters, we don't want to land
        // on top of them, so let's compute a margin distance.
        this.calculateTargetXY = function (xy, item) {
            if (typeof item === 'undefined') {
                return this.setTargetXY(xy);
            }
            var dim = item.getDimensions(),
                itemX = (dim.x1 + dim.x2) / 2;
            // playable character is on the left of the object;
            if (this.x < itemX) {
                this.setTargetXY({
                    x : dim.x1 - (this.w / 2),
                    y : xy.y
                });
            } else {
            // playable character is on the right of the object;
                this.setTargetXY({
                    x : dim.x2 + (this.w / 2),
                    y : xy.y
                });
            }
        };

        this.resetTargetXY = function () {
            this.targetXY = undefined;
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

        // this is a callback function to perform when the playable character
        // reaches the targeted place
        this.setWhenFinished = function (callback) {
            this.callback = callback;
        };

        this.updatePosition = function () {
            // attitudes
            if (this.targetXY) {
                if (this.x > this.targetXY.x && (this.x - this.targetXY.x > this.speed)) {
                    this.attitude = "walkleft";
                } else if (this.x < this.targetXY.x  && (this.targetXY.x - this.x > this.speed)) {
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

        this.actForNonPlayableCharacterClick = function (event, npc) {
            this.calculateTargetXY({x : event.stageX, y : event.stageY}, npc);
            this.setWhenFinished($.proxy(function () {
                var result = action.clickNonPlayableCharacter(event);
                if (result) {
                    switch (result.action) {
                    case 'dialogMessage':
                        this.say(result.text);
                        break;
                    case 'playDialog':
                        gamedialog.perform({
                            // slice(0) clones it, because gamedialog will destroy it
                            lines: result.dialog.lines.slice(0),
                            pc: this,
                            npc: npc
                        });
                        break;
                    }
                }
            }, this));
        };

        this.actForExitClick = function (event, exit) {
            action.clickExit(event);
            this.calculateTargetXY({x : event.stageX, y : event.stageY});
            this.setWhenFinished($.proxy(function () {
                if (exit.hasCondition()) {
                    // TODO: check properly the condition, once inventory is ready.
                    this.say(exit.condition.onFail.line);
                    return;
                }

                // I have to require this, as the game stage requires the playable character
                // to update its position. This is a lazy load.
                require('engine/stage/main').getInstance().switchScene(
                    'scene.' + exit.from,
                    'scene.' + exit.to,
                    exit.characterPosition
                );
            }, this));
        };

        this.actForObjectClick = function (event, object) {
            // I don't have to walk to an inventory
            if (object.renderedAs === 'inventory') {
                var result = action.clickObject(event);
                if (result) {
                    this.say(result.text);
                }
                return;
            }

            // else, walk there, then perform the action.
            this.calculateTargetXY({x : event.stageX, y : event.stageY}, object);
            this.setWhenFinished($.proxy(function () {
                var result = action.clickObject(event);
                if (result) {
                    this.say(result.text);
                }
            }, this));
        };
    };
    return PlayableCharacter;
});