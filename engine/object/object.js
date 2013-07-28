/*global define, createjs, $ */

/**
 * This module is a game object class
 */
define([
    'engine/lib/assets'
], function (
    assets
) {
    var GameObject = function (options) {
        this.initialize(options);
    };

    var p = GameObject.prototype = new createjs.Container();
    p.GameObject_initialize = p.initialize;
    p.initialize = function (options) {
        this.GameObject_initialize();

        this.name  = options.id;
        this.label = options.label;

        this.x = options.x;
        this.y = options.y;
        this.w = options.w;
        this.h = options.h;

        this.imageInInventory = assets.getQueueLoaded().getResult(options.imageInInventory);
        this.imageInStage     = assets.getQueueLoaded().getResult(options.imageInStage);
        this.canBeOnStage     = options.canBeOnStage;
        this.canBeOnInventory = options.canBeOnInventory;
        this.canBePickedUp    = options.canBePickedUp;

        this.renderedAs  = undefined;
        this.isMouseOver = false;

        this.image = new createjs.Bitmap();
        this.background = new createjs.Shape();
        this.background.x = 0;
        this.background.y = 0;

        this.addChild(
            this.background,
            this.image
        );

        this.getState = function () {
            return {
                'x' : this.x,
                'y' : this.y,
                'w' : this.w,
                'h' : this.h
            };
        };

        this.setState = function (json) {
            this.x      = json.x;
            this.y      = json.y;
            this.scaleX = json.scaleX;
            this.scaleY = json.scaleY;
        };

        this.setDimensions = function () {
            if (this.w) {
                this.image.scaleX = this.w / this.image.image.width;
            } else {
                this.image.scaleX = 1;
                this.w = this.image.image.width;
            }
            if (this.h) {
                this.image.scaleY = this.h / this.image.image.height;
            } else {
                this.image.scaleY = 1;
                this.h = this.image.image.height;
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
                this.image.image = this.imageInStage;
                this.background.graphics.clear();
                this.hitArea = undefined;
            } else if (how === "inventory") {
                this.image.image = this.imageInInventory;
                this.image.x = 5;
                this.image.y = 5;
                this.background.graphics
                    .beginStroke("#880000")
                    .beginFill("blue")
                    .drawRect(0, 0, this.w, this.h);
                this.background.alpha = 0.15;
            }
            this.setDimensions();
        };

        this.testClick = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseClick = this.hitTest(coords.x, coords.y);
            if (mouseClick) {
                scene.getPc().actForObjectClick({x: x, y: y}, this);
                return true;
            }
            return false;
        };

        this.testHit = function (x, y) {
            var coords = this.globalToLocal(x, y);
            var mouseOver = this.hitTest(coords.x, coords.y);
            if (mouseOver && !this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.background.alpha = 0.3;
                return require('engine/interaction/action').mouseOverObject(this);
            }
            if (!mouseOver && this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.background.alpha = 0.15;
                return require('engine/interaction/action').mouseOutObject(this);
            }
        };
    };

    return GameObject;
});
