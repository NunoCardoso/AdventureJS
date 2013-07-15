/*global define, createjs, $ */

/**
 * This module is a game object class
 */
define([
    'engine/console/action',
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

        this.setDimensions = function (dimensions) {
            this.x = dimensions.x;
            this.y = dimensions.y;
            if (dimensions.w) {
                this.scaleX = dimensions.w / this.image.width;
            }
            if (dimensions.h) {
                this.scaleY = dimensions.h / this.image.height;
            }
        };

        this.renderAs = function (how) {
            if (how === "stage") {
                this.image = this.imageInStage;
            } else if (how === "inventory") {
                this.image = this.imageInInventory;
            }
        };

        this.onObjectMouseOver = function (e) {
            action.mouseOverObject(e.target);
        };

        this.onObjectMouseOut = function (e) {
            action.mouseOutObject();
        };

        this.onObjectClick = function (e) {
            var result = action.clickObject(e.target);
            if (result) {
                playablecharacter.get().say(result.text);
            }
        };

        this.addEventListener("mouseover", $.proxy(this.onObjectMouseOver, this));
        this.addEventListener("mouseout",  $.proxy(this.onObjectMouseOut, this));

        this.activateClickListener = function (playableCharacter) {
            this.addEventListener("click", $.proxy(this.onObjectClick, this));
        };
    };

    return GameObject;
});
