/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/assets',
    'engine/console/main',
    'engine/gameconfig'
], function (
    assets,
    gameconsole,
    gameconfig
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

        this.addListeners = function () {
            this.addEventListener("mouseover", $.proxy(this.onObjectMouseOver, this));
            this.addEventListener("mouseout", $.proxy(this.onObjectMouseOut, this));
        };
    };

    this.onObjectMouseOver = function (e) {
        gameconsole.get().sentence.text = gameconsole.get().sentence.lockedVerb.text + ' ' + this.label;
    };

    this.onObjectMouseOut = function (e) {
        gameconsole.get().sentence.text = gameconfig.get('console.sentence.defaultText');
    };


    return GameObject;
});
