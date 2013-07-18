/*global define, createjs, $ */

/**
 * This module handles the game main menu
 */
define([
    'engine/config',
    'engine/lib/assets',
    'engine/menu/button',
    'engine/menu/label',
    'engine/menu/Settingsbutton'
], function (
    config,
    assets,
    Button,
    Label,
    SettingsButton
) {
    var main = {},

        _prepare = function (options) {

            // Title
            main.title = new createjs.Text(options.title, "36px the8bit", "#FFFFFF");
            main.title.textAlign = "center";
            main.title.textBaseline = "middle";
            main.title.x = config.getCanvasXY().x / 2;
            main.title.y = 50;
            main.title.shadow = new createjs.Shadow("#000000", 0, 0, 10);

            // Author
            main.author = new createjs.Text(options.author, "24px the8bit", "#CCCCCC");
            main.author.textAlign = "center";
            main.author.textBaseline = "middle";
            main.author.x = config.getCanvasXY().x / 2;
            main.author.y = 100;
            main.author.shadow = new createjs.Shadow("#000000", 0, 0, 10);

            // Description
            main.description = new createjs.Text(options.description, "18px the8bit", "#FFFFFF");
            main.description.textAlign = "center";
            main.description.textBaseline = "middle";
            main.description.x = config.getCanvasXY().x / 2;
            main.description.y = 200;
            main.description.shadow = new createjs.Shadow("#000000", 0, 0, 10);

            // Main Background
            main.background = new createjs.Bitmap(assets.getQueueLoaded().getResult(options.background));
            main.background.scaleX = config.getCanvasXY().x / main.background.image.width;
            main.background.scaleY = config.getCanvasXY().y / main.background.image.height;

            // start button
            main.newGameButton = new Button({
                x: config.get('newgamebutton.x'),
                y: config.get('newgamebutton.y'),
                w: config.get('button.w'),
                h: config.get('button.h'),
                r: config.get('button.r'),
                to: options.startingScene
            });

            main.loadGameButton = new Button({
                x: config.get('loadgamebutton.x'),
                y: config.get('loadgamebutton.y'),
                w: config.get('button.w'),
                h: config.get('button.h'),
                r: config.get('button.r'),
                to: options.startingScene
            });

            main.newGameLabel = new Label({
                x : config.get('newgamebutton.x') + config.get('button.w') / 2,
                y : config.get('newgamebutton.y') + config.get('button.h') / 2,
                text: config.get('newgame')
            });

            main.loadGameLabel = new Label({
                x : config.get('loadgamebutton.x') + config.get('button.w') / 2,
                y : config.get('loadgamebutton.y') + config.get('button.h') / 2,
                text: config.get('loadgame')
            });

            main.settingsButton = new SettingsButton();
        },

        closeSettings = function () {
            main.settingsButton.closePanel();
        },

        render = function (options, scene) {

            _prepare(options);

            scene.addChild(
                main.background,
                main.title,
                main.author,
                main.description,
                main.newGameButton,
                main.loadGameButton,
                main.newGameLabel,
                main.loadGameLabel,
                main.settingsButton
            );

            return scene;
        };

    return {
        'render' : render,
        'closeSettings' : closeSettings
    };
});