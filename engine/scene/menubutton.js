/*global define, createjs, $ */

/**
 * This is the main button on the corner of the scenes
 */
define([
], function (
) {
    var MenuButton = function (options) {
        this.initialize(options);
    };

    MenuButton.prototype = new createjs.Shape();
    MenuButton.prototype.MenuButton_initialize = MenuButton.prototype.initialize;
    MenuButton.prototype.initialize = function (options) {
        this.alpha = 0.5;
        this.from = options.from;
        this.graphics
            .beginStroke("#FFFFFF")
            .beginFill("#DDDDDD")
            .drawRoundRect(
                10,
                10,
                30,
                30,
                10
            );

        this.addEventListener("click", $.proxy(function (e) {
            require('engine/stage/main').getInstance().switchScene(
                this.from,
                'scene.menu'
            );
        }, this));

        this.addEventListener("mouseover", $.proxy(function (e) {
            this.alpha = 1;
        }, this));

        this.addEventListener("mouseout", $.proxy(function (e) {
            this.alpha = 0.5;
        }, this));
    };
    return MenuButton;
});