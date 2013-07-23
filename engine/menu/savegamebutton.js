/*global define, createjs, $ */

/**
 * This is the start button on the game menu
 */
define([
    'engine/config',
    'engine/menu/label',
    'engine/stage/main',
    'engine/state/main',
    'engine/tpl/main'
], function (
    config,
    Label,
    gamestage,
    gamestate,
    gametemplate
) {
    var SaveGameButton = function (options) {
        this.initialize(options);
    };

    SaveGameButton.prototype = new createjs.Container();
    SaveGameButton.prototype.SaveGameButton_initialize = SaveGameButton.prototype.initialize;
    SaveGameButton.prototype.initialize = function (options) {

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
        this.button.addEventListener("mouseover", function (e) {
            e.target.alpha = 1;
            gamestage.update();
        });

        this.button.addEventListener("mouseout", function (e) {
            e.target.alpha = 0.5;
            gamestage.update();
        });

        this.button.addEventListener("click", function (e) {
            // generate savegame JSON, save it temporarily to stage
            gamestage.setSavegame(gamestate.getToJSON());
            gametemplate.openSavegame();
        });

        this.label = new Label({
            x : options.x + config.get('button.w') / 2,
            y : options.y + config.get('button.h') / 2,
            text: config.get('savegame')
        });

        this.addChild(this.button);
        this.addChild(this.label);
    };
    return SaveGameButton;
});