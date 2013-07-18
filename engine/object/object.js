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

        this.setDimensions = function (dimensions) {
            this.x = dimensions.x;
            this.y = dimensions.y;
            if (dimensions.w) {
                this.w = dimensions.w;
                this.scaleX = dimensions.w / this.image.width;
            } else {
                this.w = this.image.width;
            }

            if (dimensions.h) {
                this.h = dimensions.h;
                this.scaleY = dimensions.h / this.image.height;
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

        this.renderAs = function (how) {
            this.renderedAs = how;
            if (how === "stage") {
                this.image = this.imageInStage;
                this.scaleX = 1;
                this.scaleY = 1;
                this.hitArea = undefined;
            } else if (how === "inventory") {
                this.image = this.imageInInventory;
                // fit inventory images into a 80x80 square
                this.scaleX = 80 / this.image.width;
                this.scaleY = 80 / this.image.height;

                // hovering on text sucks. Let's add a flat hit area!
                var hitArea = new createjs.Shape();
                hitArea.graphics.beginFill("red").drawRect(0, 0, 80, 80);
                this.hitArea = hitArea;
            }
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
