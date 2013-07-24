/*global define, createjs, $ */

/**
 * This is the main character (playable or not) class
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
    var Character = function (options) {
        this.initialize(options);
    };

    var p = Character.prototype = new createjs.Container();
    p.Character_initialize = p.initialize;
    p.initialize = function (options) {
        this.Character_initialize();

        this.name = 'character.' + options.id;
        this.label = undefined;

        this.character = new createjs.BitmapAnimation();
        this.character.spriteSheet = new createjs.SpriteSheet({
            images     : [
                assets.getQueueLoaded().getResult(options.images)
            ],
            frames     : options.frames,
            animations : options.animations
        });
        this.character.frames   = options.frames;
        this.character.attitude = 'standright';
        this.currentAnimation   = undefined;
        this.character.gotoAndPlay(this.character.attitude);
        this.textColor = options.textColor;

        this.w = this.character.frames.width;
        this.h = this.character.frames.height;

        // the register X and Y should be the feet of the sprite
        this.regX = this.w / 2;
        this.regY = this.h;

        this.targetXY = undefined;

        this.speed = options.speed;

        // important, so we can know if this is playable character, ommit some events
        this.isPlayable = false;

        // callback after reaching a place
        this.whenFinished = undefined;

        // callback after saying a balloon:
        this.afterSay = undefined;

        // setTimeout for saying something
        this.saying = undefined;

        // boolean for when this character is speaking
        this.isSpeaking = false;

        this.balloon = new Balloon({textColor : this.textColor});

        this.addChild(
            this.character,
            this.balloon
        );

        this.getDimensions = function () {
            return {
                'x1' : this.x - this.regX / 2,
                'y1' : this.y - this.regY,
                'x2' : this.x + this.regX / 2,
                'y2' : this.y
            };
        };

        this.setLabel = function (label) {
            this.label = label;
        };

        // called to restore this character from a state
        this.setState = function (json) {
            this.setX(json.x);
            this.setY(json.y);
            this.resetTargetXY();
            this.character.attitude = json.attitude;
            this.character.gotoAndPlay(this.character.attitude);
        };

        // called to convert this character state into json
        this.getState = function () {
            return {
                'x'        : this.x,
                'y'        : this.y,
                'attitude' : this.getStandAttitude()
            };
        };

        this.setX = function (x) {
            this.x = x;
        };

        this.setY = function (y) {
            this.y = y;
        };

        this.setTargetXY = function (xy) {
            this.targetXY = xy;
            // abort any callback to perform, as the current itinerary was changed
            this.whenFinished = undefined;
        };

        this.resetTargetXY = function () {
            this.targetXY = undefined;
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
        this.update = function (scene) {

            if (this.targetXY) {
                if (this.x > this.targetXY.x && (this.x - this.targetXY.x > this.speed)) {
                    this.character.attitude = "walkleft";
                } else if (this.x < this.targetXY.x  && (this.targetXY.x - this.x > this.speed)) {
                    this.character.attitude = "walkright";
                } else {
                    if (this.character.attitude === "walkleft") {
                        this.character.attitude = "standleft";
                        // perform the callback action, since the character reached his destination;
                        if (this.whenFinished) {
                            this.whenFinished.call();
                        }
                    } else if (this.character.attitude === "walkright") {
                        this.character.attitude = "standright";
                        // perform the callback action, since the character reached his destination;
                        if (this.whenFinished) {
                            this.whenFinished.call();
                        }
                    }
                }
            }
            if (this.character.attitude === "walkleft") {
                this.setX(this.x - this.speed);
            } else if (this.character.attitude === "walkright") {
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

                if (sceneHasHiddenBackgroundOnLeft && isCharacterOnLeftHalf && this.character.attitude === 'walkleft') {
                    scene.dynamic.x += this.speed;
                    // restore character into that position
                    this.setX(this.x + this.speed);
                    if (this.targetXY) {
                        // nonetheless, your targetXY comes closer
                        this.targetXY.x += this.speed;
                    }
                }

                if (sceneHasHiddenBackgroundOnRight && isCharacterOnRightHalf && this.character.attitude === 'walkright') {
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
            if (this.currentAnimation !== this.character.attitude) {
                this.currentAnimation = this.character.attitude;
                this.character.gotoAndPlay(this.character.attitude);
            }
        };

        this.talk = function (text) {
            this.isSpeaking = true;
            this.balloon.say(text);
            if (this.character.attitude === "walkleft" || this.character.attitude === "standleft") {
                this.character.attitude = 'talkleft';
            } else if (this.character.attitude === "walkright" || this.character.attitude === "standright") {
                this.character.attitude = 'talkright';
            }
            this.character.gotoAndPlay(this.character.attitude);
        };

        this.getStandAttitude = function () {
            if (this.character.attitude === "walkleft" || this.character.attitude === "talkleft") {
                return 'standleft';
            }
            if (this.character.attitude === "walkright" || this.character.attitude === "talkright") {
                return 'standright';
            }
        };

        this.stand = function () {
            this.isSpeaking = false;
            this.character.gotoAndPlay(this.getStandAttitude());
        };

        this.faceTo = function (other) {
            if (this.x < other.x) {
                this.character.attitude = 'standright';
                this.character.gotoAndPlay(this.character.attitude);
            } else {
                this.character.attitude = 'standleft';
                this.character.gotoAndPlay(this.character.attitude);
            }
        };

        this.testHit = function (x, y) {
            if (!this.isPlayable) {
                var coords = this.globalToLocal(x, y);
                var mouseOver = this.hitTest(coords.x, coords.y);
                if (mouseOver && !this.isMouseOver) {
                    this.isMouseOver = mouseOver;
                    return action.mouseOverNpc({target: this});
                }
                if (!mouseOver && this.isMouseOver) {
                    this.isMouseOver = mouseOver;
                    return action.mouseOutNpc({target: this});
                }
            }
        };

        this._performResult = function (result, npc) {
            switch (result.action) {
            case 'dialogMessage':
                this.say(result.text);
                return;
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
        };

        this.actForNpcClick = function (event, npc) {
            this.calculateTargetXY({x : event.stageX, y : event.stageY}, npc);
            this.setWhenFinished($.proxy(function () {
                var result = action.clickNpc(event);
                if (result) {
                    action.reset();
                    this._performResult(result, npc);
                }
            }, this));
        };

        this.activateClickListener = function (pc) {
            this.addEventListener("click", $.proxy(function (e) {
                pc.actForNpcClick(e, this);
            }, this));
        };

        this.actForExitClick = function (event, exit) {
            action.clickExit(event);
            this.calculateTargetXY({x : event.stageX, y : event.stageY});
            this.setWhenFinished($.proxy(function () {
                if (exit.hasCondition()) {
                    // TODO: check properly the condition, once inventory is ready.
                    var result = exit.testCondition();
                    if (result) {
                        action.reset();
                        this._performResult(result);
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
                    // clean up sentence.
                    action.reset();
                    this._performResult(result);
                }
                return;
            }

            // else, walk there, then perform the action.
            this.calculateTargetXY({x : event.stageX, y : event.stageY}, object);
            this.setWhenFinished($.proxy(function () {
                var result = action.clickObject(event);
                if (result) {
                    // clean up sentence.
                    action.reset();
                    this._performResult(result);
                }
            }, this));
        };
    };
    return Character;
});