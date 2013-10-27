/*global define, createjs, $ */

/**
 * This is the main character (playable or not) class
 */
define([
    'engine/interaction/action',
    'engine/character/balloon',
    'engine/character/move',
    'engine/character/sprite',
    'engine/dialog/main',
    'engine/cursor/main'
], function (
    action,
    Balloon,
    move,
    Sprite,
    gamedialog,
    gamecursor
) {
    var Character = function (options) {
        this.initialize(options);
    };

    var p = Character.prototype = new createjs.Container();
    p.Character_initialize = p.initialize;
    p.initialize = function (options) {
        this.Character_initialize();

        this.name  = options.id;
        this.label = undefined;

        this.character = new Sprite(options);
        this.textColor = options.textColor || "#000000";

        this.balloon   = new Balloon({textColor : this.textColor});

        this.w = this.character.frames.width;
        this.h = this.character.frames.height;

        this.salt = [];

        // the register X and Y should be the feet of the sprite
        this.regX = 0;
        this.regY = this.h;

        this.targetXY = undefined;
        this.speed    = options.speed;

        // important, so we can know if this is playable character, ommit some events
        this.isPlayable = false;

        // Deferred for talk and walk
        this.talkDeferred = undefined;
        this.walkDeferred = undefined;

        // boolean for when this character is speaking
        this.isSpeaking = false;

        this.addChild(
            this.character,
            this.balloon
        );

        this.calculateBestTarget = function (mousexy, characterxy, scene) {
            var dim = {
                'x1' : mousexy.x - this.w / 2,
                'x2' : mousexy.x + this.w / 2,
                'y1' : mousexy.y - this.regY,
                'y2' : mousexy.y
            };

            var itemX = (dim.x1 + dim.x2) / 2;

            // Dimensions of itemX will be RELATIVE to the game window,
            // so they are a bounding box of it, on mouse-kind of coordinates.
            // playable character is not, so add the backgroundOffset to have
            // the RELATIVE coordinates.

            // playable character is on the left of the object;
            if (characterxy.x + scene.backgroundOffset < itemX) {
                return {
                    x : dim.x1,
                    y : mousexy.y
                };
            }
            // playable character is on the right of the object;
            return {
                x : dim.x2,
                y : mousexy.y
            };
        };

        this.changeAttitudeTo = function (attitude) {
            this.character.attitude = attitude;
            this.character.gotoAndPlay(this.character.attitude);
        };

        this.setLabel = function (label) {
            this.label = label;
        };

        // called to restore this character from a state
        this.setState = function (json) {
            if (json.x) {
                this.setX(json.x);
                this.setY(json.y);
                this.resetTargetXY();
                this.changeAttitudeTo(json.attitude);
            }
        };

        // called to convert this character state into json
        this.getState = function () {
            return {
                'x'        : this.x,
                'y'        : this.y,
                'attitude' : this.character.getStandAttitude()
            };
        };

        this.setX = function (x) {
            this.x = x;
        };

        this.setY = function (y) {
            this.y = y;
        };

        this.moveTo = function (xy, reference) {
            var scene = require('engine/stage/main').get().getCurrentScene(),
                coords,
                c;

            if (reference === 'global') {
                c = xy;
            } else {
                coords = scene.getBackground().globalToLocal(xy.x, xy.y);
                c = {
                    x: coords.x,
                    y: coords.y
                };
            }

            scene.setTargetCursorXY(c);
            this.targetXY = c;
            this.walkDeferred = $.Deferred();
            return this.walkDeferred;
        };

        this.resetTargetXY = function () {
            this.targetXY = undefined;
            require('engine/stage/main').get().getCurrentScene().setTargetCursorXY({
                x: -100,
                y: -100
            });
        };

        // mouse position click can be the target click on most ocations,
        // but if we clicked on items/characters, we don't want to land
        // on top of them, so let's compute a margin distance.
        this.calculateTargetXY = function (mousexy, item, scene) {
            if (!item) {
                return this.moveTo(mousexy);
            }

            var thisxy = {x: this.x, y: this.y};
            var newTarget = item.calculateBestTarget(mousexy, thisxy, scene);
            return this.moveTo(newTarget);
        };

        // triggered when dot key is press
        // it shutups, but continues the conversation, if on the middle of one
        this.stopSay = function () {
            this.shutUp();
            if (this.talkDeferred && this.talkDeferred.state() === 'pending') {
                this.talkDeferred.resolve();
            }
        };

        this.say = function (text, callback) {
            if (this.talkDeferred) {
                this.talkDeferred.reject();
            }

            this.talkDeferred = $.Deferred();
            // 0.1 sec per letter;
            var interv = text.length * 100;

            // have a min of 2 secs per balloon
            if (interv < 2000) {
                interv = 2000;
            }
            this.talk(text);
            setTimeout($.proxy(function () {
                this.stopSay();
            }, this), interv);
            return this.talkDeferred.promise();
        };

        this.shutUp = function () {
            this.stand();
            this.balloon.shutUp();
        };

        this.update = function (scene) {
            move.move(this, scene);
            scene.checkCharacterZ();
        };

        this.talk = function (text) {
            this.isSpeaking = true;
            this.balloon.say(text);
            if (this.character.isFacingLeft()) {
                this.changeAttitudeTo('talkleft');
            } else if (this.character.isFacingRight()) {
                this.changeAttitudeTo('talkright');
            }
        };

        this.stop = function () {
            // if he is talking (a taking started), 
            // let it talk. Just ask it to stand when he is not standing and not tallking
            if (!this.character.isTalking()) {

                if (this.character.isFacingLeft() && !this.character.isStandingLeft()) {
                    this.changeAttitudeTo('standleft');
                } else if (this.character.isFacingRight() && !this.character.isStandingRight()) {
                    this.changeAttitudeTo('standright');
                }
            }
            // perform the callback action, since the character reached his destination;
            if (this.walkDeferred  && this.walkDeferred.state() === 'pending') {
                this.walkDeferred.resolve();
            }
        };

        this.stand = function () {
            this.isSpeaking = false;
            this.changeAttitudeTo(this.character.getStandAttitude());
        };

        this.faceTo = function (other) {
            if (this.x < other.x) {
                this.changeAttitudeTo('standright');
            } else {
                this.changeAttitudeTo('standleft');
            }
        };

        this.test = function (x, y, event, scene, role) {
            var coords = this.globalToLocal(x, y),
                mine   = this.hitTest(coords.x, coords.y);
            switch (event) {
            case 'hover':
                if (!this.isPlayable) {
                    if (mine && !this.isMouseOver) {
                        this.isMouseOver = mine;
                        return action.mouseOverNpc(this);
                    }
                    if (!mine && this.isMouseOver) {
                        this.isMouseOver = mine;
                        return action.mouseOutNpc(this);
                    }
                }
                return false;
            case 'click':
                if (!this.isPlayable) {
                    if (mine) {
                        // I might be a npc, to ask pc to start it.
                        scene.getPc().actForNpcClick({x: x, y: y}, this, scene);
                        // important, to stop bubbling
                        return true;
                    }
                }
                return false;
            case 'drag':
                if (mine) {
                    if (role === 'play') {
                        console.log('can\'t  drag while playing');
                    } else {
                        this.x = coords.x;
                        this.y = coords.y;
                    }
                    return true;
                }
                return false;
            default:
                return false;
            }
        };

        this.addSalt = function (_salt) {
            if (this.salt.indexOf(_salt) === -1) {
                this.salt.push(_salt);
                this.salt.sort();
            }
        };

        this.actForNpcClick = function (xy, npc, scene) {
            var d = this.calculateTargetXY(xy, npc, scene);
            d.done(function () {
                action.clickNpc(npc);
            });
        };

        this.actForExitClick = function (event, exits) {
            action.clickExit(exits);
            var d = this.calculateTargetXY(event);
            d.done(function () {
                exits.from.doExit(exits.to);
            });
        };

        this.actForObjectClick = function (event, scene, object) {
            // I don't have to walk to an inventory
            if (object.renderedAs === 'inventory') {
                action.clickObject(object);
                return;
            }
            // else, walk there, then perform the action.
            var d = this.calculateTargetXY(event, object, scene);
            d.done(function () {
                action.clickObject(object);
            });
            return;
        };
    };
    return Character;
});