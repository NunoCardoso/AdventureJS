/*global define, createjs, $ */

/**
 * This is the start button on the game menu
 */
define([
    'engine/config',
    'engine/menu/label',
    'engine/stage/main',
    'engine/state/main'
], function (
    config,
    Label,
    gamestage,
    gamestate
) {
    var Button = function (options) {
        this.initialize(options);
    };

    var p = Button.prototype = new createjs.Container();
    p.Button_initialize = p.initialize;
    p.initialize = function (options) {
        this.Button_initialize();

        this.button = new createjs.Shape();
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.w = options.w || 0;
        this.h = options.h || 0;
        this.r = options.r || 0;

        this.button.alpha = 0.5;

        this.label = new Label({
            x : config.get('button.w') / 2,
            y : config.get('button.h') / 2,
            text: config.get(options.label)
        });

        this.addChild(this.button);
        this.addChild(this.label);

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
            this.button.alpha = 0.5;
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

        this.render();


        this.on("mouseover", function (e) {
            this.button.alpha = 1;
            gamestage.update();
        });

        this.on("mouseout",  function (e) {
            this.button.alpha = 0.5;
            gamestage.update();
        });
    };
    return Button;
});