/*global define, createjs, $ */

/**
 * This module is a game object class
 */
define([
    'engine/interaction/action',
    'engine/lib/assets'
], function (
    action,
    assets
) {
    var GameObject = function (options) {
        this.initialize(options);
    };

    GameObject.prototype = new createjs.Bitmap();
    GameObject.prototype.GameObject_initialize = GameObject.prototype.initialize;
    GameObject.prototype.initialize = function (options) {
        this.GameObject_initialize();

        this.name = 'object.' + options.id;
        this.label = options.label;
        this.imageInInventory = assets.getQueueLoaded().getResult(options.imageInInventory);
        this.imageInStage = assets.getQueueLoaded().getResult(options.imageInStage);
        this.canBeOnStage = options.canBeOnStage;
        this.canBeOnInventory = options.canBeOnInventory;
        this.canBePickedUp = options.canBePickedUp;
        this.renderedAs = undefined;

        this.getState = function () {
            return {
                'x' : this.x,
                'y' : this.y,
                'w' : this.w,
                'h' : this.h
            };
        };

        this.setState = function (json) {
            this.x = json.x;
            this.y = json.y;
            this.scaleX = json.scaleX;
            this.scaleY = json.scaleY;
        };

        this.setDimensions = function () {
            if (this.w) {
                this.scaleX = this.w / this.image.width;
            } else {
                this.w = this.image.width;
            }

            if (this.h) {
                this.scaleY = this.h / this.image.height;
            } else {
                this.h = this.image.height;
            }
        };

        this.getDimensions = function () {
            return {
                'x1' : this.x,
                'x2' : this.x + this.w,
                'y1' : this.y,
                'y2' : this.y + this.h
            };
        };

        this.renderAs = function (how, dimensions) {
            this.renderedAs = how;
            this.x = dimensions.x;
            this.y = dimensions.y;
            this.w = dimensions.w;
            this.h = dimensions.h;
            if (how === "stage") {
                this.image = this.imageInStage;
                this.hitArea = undefined;
            } else if (how === "inventory") {
                this.image = this.imageInInventory;
                // fit inventory images into a 80x80 square

                // hovering on text sucks. Let's add a flat hit area!
/*                var hitArea = new createjs.Shape();
                hitArea.graphics.beginFill("red").drawRect(0, 0, 80, 80);
                this.hitArea = hitArea;
*/          }
            this.setDimensions();
        };

        this.onObjectMouseOver = function (e) {
            action.mouseOverObject(e);
        };

        this.onObjectMouseOut = function (e) {
            action.mouseOutObject(e);
        };

        this.addEventListener("mouseover", $.proxy(this.onObjectMouseOver, this));
        this.addEventListener("mouseout",  $.proxy(this.onObjectMouseOut, this));

        this.activateClickListener = function (playableCharacter) {
            this.addEventListener("click", $.proxy(function (e) {
                playableCharacter.actForObjectClick(e, this);
            }, this));
        };
    };

    return GameObject;
});
