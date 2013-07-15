/*global define, createjs, $ */

/**
 * This module handles the game main menu
 */
define([
    'engine/config',
    'engine/lib/assets',
    'engine/menu/startbutton',
    'engine/menu/startbuttonlabel',
], function (
    config,
    assets,
    StartButton,
    StartButtonLabel
) {
    var main = {},

        _prepare = function (options) {

            // Title
            main.title = new createjs.Text(options.title, "20px the8bit", "#FFFFFF");
            main.title.textAlign = "center";
            main.title.textBaseline = "middle";
            main.title.x = config.getCanvasXY().x / 2;
            main.title.y = 20;

            // Author
            main.author = new createjs.Text(options.author, "17px the8bit", "#CCCCCC");
            main.author.textAlign = "center";
            main.author.textBaseline = "middle";
            main.author.x = config.getCanvasXY().x / 2;
            main.author.y = 50;

            // Description
            main.description = new createjs.Text(options.description, "14px the8bit", "#FFFFFF");
            main.description.textAlign = "center";
            main.description.textBaseline = "middle";
            main.description.x = config.getCanvasXY().x / 2;
            main.description.y = 100;

            // Main Background
            main.background = new createjs.Bitmap(assets.getQueueLoaded().getResult(options.background));
            main.background.scaleX = config.getCanvasXY().x / main.background.image.width;
            main.background.scaleY = config.getCanvasXY().y / main.background.image.height;

            // start button
            main.startButton = new StartButton({to: options.startingScene});
            main.startButtonLabel = new StartButtonLabel();
        },

        render = function (options, scene) {

            _prepare(options);

            scene.addChild(
                main.background,
                main.title,
                main.author,
                main.description,
                main.startButton,
                main.startButtonLabel
            );

            return scene;
        };

    return {
        'render' : render
    };
});