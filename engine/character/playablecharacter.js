/*global define, createjs, $ */

/**
 * This is the
 */
define([
    'engine/config',
    'engine/interaction/action',
    'engine/lib/assets',
    'engine/character/balloon',
    'engine/dialog/main'
], function (
    config,
    action,
    assets,
    Balloon,
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

        // callback after reaching a place
        this.whenFinished = undefined;

        // callback after saying a balloon:
        this.afterSay = undefined;

        // setTimeout for saying something
        this.saying = undefined;

        // boolean for when this character is speaking
        this.isSpeaking = false;

        this.balloon = new Balloon({});

        this.setLabel = function (label) {
            this.label = label;
        };

        this.setX = function (x) {
            this.x = x;
            this.balloon.setX(x);
        };

        this.setY = function (y) {
            this.y = y;
            this.balloon.setY(y);
        };

        this.setTargetXY = function (xy) {
            this.targetXY = xy;
            // abort any callback to perform, as the current itinerary was changed
            this.whenFinished = undefined;
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

        this.getBalloon = function () {
            return this.balloon;
        };

        this.finishedSay = function () {
            this.shutUp();
            if (typeof this.afterSay === 'function') {
                this.afterSay.call();
            }
        };

        this.say = function (text, callback) {
            // 0.1 sec per letter;
            this.afterSay = callback;
            var interv = text.length * 100;
            this.talk(text);
            this.saying = setTimeout($.proxy(this.finishedSay, this), interv);
        };

        // triggered when dot key is press
        // it shutups, but continues the conversation, if on the middle of one
        this.stopSay = function () {
            clearTimeout(this.saying);
            this.finishedSay();
        };

        this.shutUp = function () {
            this.stand();
            this.balloon.shutUp();
        };

        // this is a callback function to perform when the playable character
        // reaches the targeted place
        this.setWhenFinished = function (callback) {
            this.whenFinished = callback;
        };

        // for scenes that stretch, maybe the scene has to scroll, not the character.
        this.updatePosition = function (scene) {

            if (this.targetXY) {
                if (this.x > this.targetXY.x && (this.x - this.targetXY.x > this.speed)) {
                    this.attitude = "walkleft";
                } else if (this.x < this.targetXY.x  && (this.targetXY.x - this.x > this.speed)) {
                    this.attitude = "walkright";
                } else {
                    if (this.attitude === "walkleft") {
                        this.attitude = "standleft";
                        // perform the callback action, since the character reached his destination;
                        if (this.whenFinished) {
                            this.whenFinished.call();
                        }
                    } else if (this.attitude === "walkright") {
                        this.attitude = "standright";
                        // perform the callback action, since the character reached his destination;
                        if (this.whenFinished) {
                            this.whenFinished.call();
                        }
                    }
                }
            }
            if (this.attitude === "walkleft") {
                this.setX(this.x - this.speed);
            } else if (this.attitude === "walkright") {
                this.setX(this.x + this.speed);
            }

            if (scene && scene.isPlayable()) {
                // now, let's see if scene should scroll
                var sceneHasHiddenBackgroundOnRight = (
                    scene.background.mode !== 'fit' &&
                    (scene.dynamic.x + scene.dynamic.w > config.get('game.w'))
                );

                var sceneHasHiddenBackgroundOnLeft = (
                    scene.background.mode !== 'fit' &&
                    (scene.dynamic.x < 0)
                );

                var isCharacterOnLeftHalf = (this.x < (config.get('game.w') / 2));
                var isCharacterOnRightHalf = (this.x >= (config.get('game.w') / 2));

                if (sceneHasHiddenBackgroundOnLeft && isCharacterOnLeftHalf && this.attitude === 'walkleft') {
                    scene.dynamic.x += this.speed;
                    // restore character into that position
                    this.setX(this.x + this.speed);
                    if (this.targetXY) {
                        // nonetheless, your targetXY comes closer
                        this.targetXY.x += this.speed;
                    }
                }

                if (sceneHasHiddenBackgroundOnRight && isCharacterOnRightHalf && this.attitude === 'walkright') {
                    scene.dynamic.x -= this.speed;
                    // restore character into that position
                    this.setX(this.x - this.speed);
                    if (this.targetXY) {
                        // nonetheless, your targetXY comes closer
                        this.targetXY.x -= this.speed;
                    }
                }
            }
            // change attitude only if it is different
            if (this.currentAnimation !== this.attitude) {
                this.gotoAndPlay(this.attitude);
            }
        };

        this.talk = function (text) {
            this.isSpeaking = true;
            this.balloon.say(text);
            if (this.attitude === "walkleft" || this.attitude === "standleft") {
                this.attitude = 'talkleft';
            } else if (this.attitude === "walkright" || this.attitude === "standright") {
                this.attitude = 'talkright';
            }
            this.gotoAndPlay(this.attitude);
        };

        this.stand = function () {
            this.isSpeaking = false;
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
                            lines : result.dialog.lines.slice(0),
                            pc    : this,
                            npc   : npc,
                            onEnd : result.dialog.onEnd
                        });
                        break;
                    default:
                        console.log(action.action + ' not implemented!');
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
                    var result = exit.testCondition();
                    switch (result.action) {
                    case 'dialogMessage':
                        this.say(result.line);
                        return;
                    default:
                        console.log(action.action + ' not implemented!');
                        break;
                    }
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
                    switch (result.action) {
                    case 'dialogMessage':
                        this.say(result.text);
                        break;
                    default:
                        console.log(action.action + ' not implemented!');
                        break;
                    }
                }
                return;
            }

            // else, walk there, then perform the action.
            this.calculateTargetXY({x : event.stageX, y : event.stageY}, object);
            this.setWhenFinished($.proxy(function () {
                var result = action.clickObject(event);
                if (result) {
                    switch (result.action) {
                    // when pc picks up something
                    case 'dialogMessage':
                        this.say(result.text);
                        break;
                    default:
                        console.log(action.action + ' not implemented!');
                        break;
                    }
                }
            }, this));
        };
    };
    return PlayableCharacter;
});