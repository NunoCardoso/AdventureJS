/*global define, createjs, $ */

/**
 * This is the start button on the game menu
 */
define([
    'engine/config',
    'engine/menu/label',
    'engine/stage/main',
    'engine/savegame/main',
    'engine/state/main'
], function (
    config,
    Label,
    gamestage,
    savegame,
    gamestate
) {
    var LoadGameButton = function (options) {
        this.initialize(options);
    };

    LoadGameButton.prototype = new createjs.Container();
    LoadGameButton.prototype.LoadGameButton_initialize = LoadGameButton.prototype.initialize;
    LoadGameButton.prototype.initialize = function (options) {

        this.nextScene = options.to;

        this.button = new createjs.Shape();
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.w = options.w || 0;
        this.h = options.h || 0;
        this.r = options.r || 0;

        this.button.alpha = 0.5;

        this.button.addEventListener("mouseover", $.proxy(function (e) {
            e.target.alpha = 1;
            gamestage.update();
        }, this));

        this.button.addEventListener("mouseout", $.proxy(function (e) {
            e.target.alpha = 0.5;
            gamestage.update();
        }, this));

        this.button.addEventListener("click", function (e) {
            var slot = 0,
                json = savegame.load(slot);
            console.log('load game from slot ' + slot);
            console.log(json);
            createjs.Ticker.setPaused(false);
            gamestate.setFromJSON(json);
        });

        this.label = new Label({
            x : this.x + config.get('button.w') / 2,
            y : this.y + config.get('button.h') / 2,
            text: config.get('loadgame')
        });

        this.setX = function (x) {
            this.x = x;
            this.label = this.x + config.get('button.w') / 2;
        };

        this.setY = function (y) {
            this.y = y;
            this.label = this.y + config.get('button.h') / 2;
        };

        this.render = function () {
            this.button.graphics.clear();
            this.button.graphics
                .beginStroke("#880000")
                .beginFill("red")
                .drawRoundRect(
                    0,
                    0,
                    this.w,
                    this.h,
                    this.r
                );
        };

        this.addChild(this.button);
        this.addChild(this.label);
    };
    return LoadGameButton;
});