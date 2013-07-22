/*global define, createjs, $ */

/**
 * This is the main button on the corner of the scenes
 */
define([
    'engine/lib/assets'
], function (
    assets
) {
    var MenuButton = function (options) {
        this.initialize(options);
    };

    MenuButton.prototype = new createjs.Container();
    MenuButton.prototype.MenuButton_initialize = MenuButton.prototype.initialize;
    MenuButton.prototype.initialize = function (options) {
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

        this.button.addEventListener("click", $.proxy(function (e) {
            var menu = require('engine/menu/main').get();
            menu.renderForSaveGame();
            var gamestage = require('engine/stage/main');
            gamestage.pause();
            gamestage.getInstance().addMenuScene(
                'scene.menu'
            );
        }, this));

        this.button.addEventListener("mouseover", $.proxy(function (e) {
            this.button.alpha = 1;
        }, this));

        this.button.addEventListener("mouseout", $.proxy(function (e) {
            this.button.alpha = 0.5;
        }, this));

        this.cogwheel = new createjs.Bitmap();
        this.cogwheel.image  = assets.getQueueLoaded().getResult('menuCogwheel01');
        this.cogwheel.x = 7;
        this.cogwheel.y = 7;
        this.cogwheel.scaleX = 30 / this.cogwheel.image.width;
        this.cogwheel.scaleY = 30 / this.cogwheel.image.height;

        this.addChild(this.button);
        this.addChild(this.cogwheel);
    };
    return MenuButton;
});