/*global define, createjs, $ */

/**
 * This is the main button on the corner of the scenes
 */
define([
    'engine/config',
    'engine/tpl/main'
], function (
    config,
    gametemplate
) {
    var HelpButton = function (options) {
        this.initialize(options);
    };

    var p = HelpButton.prototype = new createjs.Container();
    p.HelpButton_initialize = p.initialize;
    p.initialize = function (options) {
        this.HelpButton_initialize();

        this.name = 'helpbutton';

        this.button = new createjs.Shape();
        this.button.alpha = 0.5;
        this.button.x = config.get('game.w') - 34 - 5;
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

        this.text = new createjs.Text("?", "34px the8bit", "#FFFFFF");
        this.text.x = config.get('game.w') - 34 + 5;
        this.text.y = 7;

        this.isMouseOver = false;

        this.addChild(this.button);
        this.addChild(this.text);

        // hovering on text sucks. Let's add a flat hit area!
        this.test = function (x, y, event, scene, role) {
            var coords = this.globalToLocal(x, y),
                mine   = this.hitTest(coords.x, coords.y);

            switch (event) {
            case 'click':
                if (mine) {
                    gametemplate.openHelp(scene.description);
                    return true;
                }
                return false;
            case 'hover':
                if (mine && !this.isMouseOver) {
                    this.isMouseOver = mine;
                    this.button.alpha = 1;
                    return true;
                }
                if (!mine && this.isMouseOver) {
                    this.isMouseOver = mine;
                    this.button.alpha = 0.5;
                    return true;
                }
                return false;
            default:
                return false;
            }
        };
    };
    return HelpButton;
});