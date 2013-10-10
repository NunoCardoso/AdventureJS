/*global define */

/**
 * This is the pane's Achievement class
 */
define([
    'engine/config'
], function (
    config
) {
    var Achievement = function (options) {
        this.initialize(options);
    };

    var p = Achievement.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.initialize = function (options) {
        this.Container_initialize();

        this.x = 0;
        this.y = 0;
        this.name = options.id;
        this.text = new createjs.Text();

        this.text.text = config.get('achievement.unlocked') + ":\n" + options.title;
        this.text.font = "28px the8bit";
        this.text.color = "#000000";
        this.text.textAlign = "center";
        this.text.textBaseline = "middle";
        this.text.alpha = 1;

        this.background = new createjs.Shape();
        this.background.x = 0;
        this.background.y = 0;

        this.text.x = 5;
        this.text.y = 5;

        this.background.graphics
            .beginStroke("yellow")
            .beginFill("#fffacd")
            .drawRect(0, 0,
                this.text.getMeasuredWidth() + 10,
                this.text.getMeasuredHeight() + 10);

        this.background.alpha = 1;

        this.regX = -config.get('game.w') / 2;
        this.regY = -30;

        this.background.regX = this.text.getMeasuredWidth() / 2;
        this.background.regY = 13;

        this.addChild(
            this.background,
            this.text
        );

        this.publish = function () {
            var stage = require('engine/stage/main').get();
            this.alpha = 0;
            stage.addChild(this);
            createjs.Tween.get(this).to({alpha: 1}, 1000)
                .wait(3000)
                .to({alpha: 0}, 1000)
                .call(function () {
                    stage.removeChild(this);
                });
        };
    };
    return Achievement;
});