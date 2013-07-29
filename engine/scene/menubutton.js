/*global define, createjs, $ */

/**
 * This is the main button on the corner of the scenes
 */
define([
    'engine/config',
    'engine/lib/assets'
], function (
    config,
    assets
) {
    var MenuButton = function (options) {
        this.initialize(options);
    };

    var p = MenuButton.prototype = new createjs.Container();
    p.MenuButton_initialize = p.initialize;
    p.initialize = function (options) {
        this.MenuButton_initialize();

        this.name = 'menubutton';
        this.from = options.from;

        this.button = new createjs.Shape();
        this.button.alpha = 0.5;
        this.button.x = 3;
        this.button.y = 3;
        this.button.graphics
            .beginStroke("#FFFFFF")
            .beginFill("#DDDDDD")
            .drawRoundRect(
                2,
                2,
                34,
                34,
                10
            );

        this.cogwheel = new createjs.Bitmap();
        this.cogwheel.image  = assets.getQueueLoaded().getResult('image.menu.cogwheel');
        this.cogwheel.x = 7;
        this.cogwheel.y = 7;
        this.cogwheel.scaleX = 30 / this.cogwheel.image.width;
        this.cogwheel.scaleY = 30 / this.cogwheel.image.height;

        this.isMouseOver = false;

        this.addChild(this.button);
        this.addChild(this.cogwheel);

       // hovering on text sucks. Let's add a flat hit area!
        this.testClick = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseClick = this.hitTest(coords.x, coords.y);
            if (mouseClick) {
                var gamestage = require('engine/stage/main');
                gamestage.takeSnapshot();
                // now, prepare menu for save/load/resume
                var menu = require('engine/menu/main').get();
                menu.renderForSaveGame();
                gamestage.pause();
                gamestage.getInstance().addMenuScene('scene.menu');
                return true;
            }
            return false;
        };

        this.testHit = function (x, y) {
            var coords = this.globalToLocal(x, y);
            var mouseOver = this.hitTest(coords.x, coords.y);
            if (mouseOver && !this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.button.alpha = 1;
                return true;
            }
            if (!mouseOver && this.isMouseOver) {
                this.isMouseOver = mouseOver;
                this.button.alpha = 0.5;
                return true;
            }
            return false;
        };
    };
    return MenuButton;
});