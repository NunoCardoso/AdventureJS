/*global define, createjs, $ */

/**
 * This is the main character (playable or not) class
 */
define([
    'engine/interaction/action',
    'engine/character/balloon',
    'engine/character/move',
    'engine/character/sprite',
    'engine/dialog/main'
], function (
    action,
    Balloon,
    move,
    Sprite,
    gamedialog
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
        this.balloon = new Balloon({textColor : this.textColor});

        this.textColor = options.textColor;

        this.w = this.character.frames.width;
        this.h = this.character.frames.height;

        // the register X and Y should be the feet of the sprite
        this.regX = this.w / 2;
        this.regY = this.h;

        this.targetXY = undefined;
        this.speed    = options.speed;

        // important, so we can know if this is playable character, ommit some events
        this.isPlayable = false;

        // Deferred for talk
        this.talkDeferred = undefined;
        this.walkDeferred = undefined;

        // boolean for when this character is speaking
        this.isSpeaking = false;

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
                'attitude' : this.character.getStandAttitude()
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
            this.walkDeferred = $.Deferred();
            return this.walkDeferred;
        };

        this.moveTo = function (position) {
            return this.setTargetXY(position);
        };

        this.resetTargetXY = function () {
            this.targetXY = undefined;
        };

        // mouse position click can be the target click on most ocations,
        // but if we clicked on items/characters, we don't want to land
        // on top of them, so let's compute a margin distance.
        this.calculateTargetXY = function (xy, item) {
            if (!item) {
                return this.moveTo(xy);
            }
            var dim = item.getDimensions(),
                itemX = (dim.x1 + dim.x2) / 2;
            // playable character is on the left of the object;
            if (this.x < itemX) {
                return this.moveTo({
                    x : dim.x1 - (this.w / 2),
                    y : xy.y
                });
            }
            // playable character is on the right of the object;
            return this.moveTo({
                x : dim.x2 + (this.w / 2),
                y : xy.y
            });
        };

        // triggered when dot key is press
        // it shutups, but continues the conversation, if on the middle of one
        this.stopSay = function () {
            if (this.talkDeferred) {
                this.talkDeferred.resolve();
                this.talkDeferred = undefined;
            }
            this.shutUp();
        };

        this.say = function (text, callback) {
            this.talkDeferred = $.Deferred();
            // 0.1 sec per letter;
            var interv = text.length * 100;
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
        };

        this.talk = function (text) {
            this.isSpeaking = true;
            this.balloon.say(text);
            if (this.character.isFacingLeft()) {
                this.character.attitude = 'talkleft';
            } else if (this.character.isFacingRight()) {
                this.character.attitude = 'talkright';
            }
            this.character.gotoAndPlay(this.character.attitude);
        };

        this.stand = function () {
            this.isSpeaking = false;
            this.character.gotoAndPlay(this.character.getStandAttitude());
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

        this.testHit = function (x, y, role) {
            if (!this.isPlayable) {
                var coords = this.globalToLocal(x, y);
                var mouseOver = this.hitTest(coords.x, coords.y);
                if (mouseOver && !this.isMouseOver) {
                    this.isMouseOver = mouseOver;
                    return action.mouseOverNpc(this);
                }
                if (!mouseOver && this.isMouseOver) {
                    this.isMouseOver = mouseOver;
                    return action.mouseOutNpc(this);
                }
            }
        };

        this.testClick = function (x, y, scene, role) {
            if (!this.isPlayable) {
                var coords = this.globalToLocal(x, y);
                var mouseClick = this.hitTest(coords.x, coords.y);
                if (mouseClick) {
                    scene.getPc().actForNpcClick({x: x, y: y}, this);
                    // important, to stop bubbling
                    return true;
                }
            }
            return false;
        };

        this.testDrag = function (x, y, scene, role) {
            var coords = this.globalToLocal(x, y);
            var mouseClick = this.hitTest(coords.x, coords.y);
            if (mouseClick) {
                if (role === 'play') {
                    console.log('can\'t  drag while playing');
                } else {
                    this.x = coords.x;
                    this.y = coords.y;
                }
                return true;
            }
            return false;
        };

        this.actForNpcClick = function (xy, npc) {
            var d = this.calculateTargetXY(xy, npc);
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

        this.actForObjectClick = function (event, object) {
            // I don't have to walk to an inventory
            if (object.renderedAs === 'inventory') {
                action.clickObject(object);
                return;
            }
            // else, walk there, then perform the action.
            var d = this.calculateTargetXY(event, object);
            d.done(function () {
                action.clickObject(object);
            });
            return;
        };
    };
    return Character;
});