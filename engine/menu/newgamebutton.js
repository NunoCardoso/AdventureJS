/*global define, createjs, $ */

/**
 * This is the start button on the game menu
 */
define([
    'engine/config',
    'engine/menu/label',
    'engine/stage/main'
], function (
    config,
    Label,
    gamestage
) {
    var NewGameButton = function (options) {
        this.initialize(options);
    };

    NewGameButton.prototype = new createjs.Container();
    NewGameButton.prototype.NewGameButton_initialize = NewGameButton.prototype.initialize;
    NewGameButton.prototype.initialize = function (options) {

        this.nextScene = options.to;

        this.button = new createjs.Shape();
        this.button.alpha = 0.5;
        this.button.graphics
            .beginStroke("#880000")
            .beginFill("red")
            .drawRoundRect(
                options.x,
                options.y,
                options.w,
                options.h,
                options.r
            );

        this.button.addEventListener("mouseover", $.proxy(function (e) {
            e.target.alpha = 1;
        }, this));

        this.button.addEventListener("mouseout", $.proxy(function (e) {
            e.target.alpha = 0.5;
        }, this));

        this.button.addEventListener("click", $.proxy(function (e) {
            gamestage.getInstance().switchScene(
                'scene.menu',
                'scene.' + this.nextScene
            );
        }, this));

        this.label = new Label({
            x : options.x + config.get('button.w') / 2,
            y : options.y + config.get('button.h') / 2,
            text: config.get('newgame')
        });


        this.addChild(this.button);
        this.addChild(this.label);
    };
    return NewGameButton;
});