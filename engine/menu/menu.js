/*global define, createjs, $ */

/**
 * This module handles the game main menu
 */
define([
    'engine/config',
    'engine/lib/assets',
    'engine/menu/button',
    'engine/menu/settings'
], function (
    config,
    assets,
    Button,
    SettingsButton
) {

    var GameMenu = function (options) {
        this.initialize(options);
    };

    var p = GameMenu.prototype = new createjs.Container();
    p.GameMenu_initialize = p.initialize;
    p.initialize = function (options) {
        this.GameMenu_initialize();

        this.name = 'scene.menu';

        this.isInteractable = function () {
            return false;
        };

        this.isPlayable = function () {
            return false;
        };

        // Title
        this.title = new createjs.Text(options.title, "36px the8bit", "#FFFFFF");
        this.title.textAlign = "center";
        this.title.textBaseline = "middle";
        this.title.x = config.getCanvasXY().x / 2;
        this.title.y = 50;
        this.title.shadow = new createjs.Shadow("#000000", 0, 0, 10);

        // Author
        this.author = new createjs.Text(options.author, "24px the8bit", "#CCCCCC");
        this.author.textAlign = "center";
        this.author.textBaseline = "middle";
        this.author.x = config.getCanvasXY().x / 2;
        this.author.y = 100;
        this.author.shadow = new createjs.Shadow("#000000", 0, 0, 10);

        // Description
        this.description = new createjs.Text(options.description, "18px the8bit", "#FFFFFF");
        this.description.textAlign = "center";
        this.description.textBaseline = "middle";
        this.description.x = config.getCanvasXY().x / 2;
        this.description.y = 200;
        this.description.shadow = new createjs.Shadow("#000000", 0, 0, 10);

        // Main Background
        this.background = new createjs.Bitmap(assets.getQueueLoaded().getResult(options.background));
        this.background.scaleX = config.getCanvasXY().x / this.background.image.width;
        this.background.scaleY = config.getCanvasXY().y / this.background.image.height;

        this.newGameButton = new Button({
            label: 'newgame',
            x: config.get('button1of2.x'),
            y: config.get('button1of2.y'),
            w: config.get('button.w'),
            h: config.get('button.h'),
            r: config.get('button.r'),
            onClick: function () {
                var gamestage = require('engine/stage/main');
                gamestage.activateTick();
                gamestage.getInstance().switchScene(
                    'scene.menu',
                    options.startingScene
                );
            }
        });

        this.loadGameButton = new Button({
            label: 'loadgame',
            w: config.get('button.w'),
            h: config.get('button.h'),
            r: config.get('button.r'),
            onClick: function () {
                require('engine/tpl/main').openLoadgame();
            }
        });

        this.saveGameButton = new Button({
            label: 'savegame',
            x: config.get('button1of3.x'),
            y: config.get('button1of3.y'),
            w: config.get('button.w'),
            h: config.get('button.h'),
            r: config.get('button.r'),
            onClick: function () {
                // generate savegame JSON, save it temporarily to stage
                require('engine/stage/main').setSavegame(
                    require('engine/state/main').getToJSON()
                );
                require('engine/tpl/main').openSavegame();
            }
        });

        this.resumeGameButton = new Button({
            label: 'resumegame',
            x: config.get('button3of3.x'),
            y: config.get('button3of3.y'),
            w: config.get('button.w'),
            h: config.get('button.h'),
            r: config.get('button.r'),
            onClick: function () {
                var stage = require('engine/stage/main');
                stage.play();
                stage.getInstance().removeMenuScene('scene.menu');
            }
        });

        this.settingsButton = new SettingsButton();

        this.renderForNewGame = function () {

            this.loadGameButton.setX(config.get('button2of2.x'));
            this.loadGameButton.setY(config.get('button2of2.y'));
            this.loadGameButton.render();

            this.removeAllChildren();
            this.addChild(
                this.background,
                this.title,
                this.author,
                this.description,
                this.newGameButton,
                this.loadGameButton,
                this.settingsButton
            );
        };

        this.renderForSaveGame = function () {
            this.removeAllChildren();

            this.loadGameButton.setX(config.get('button2of3.x'));
            this.loadGameButton.setY(config.get('button2of3.y'));
            this.loadGameButton.render();

            this.addChild(
                this.background,
                this.title,
                this.author,
                this.description,
                this.saveGameButton,
                this.loadGameButton,
                this.resumeGameButton,
                this.settingsButton
            );
        };

        this.render = function () {
            this.renderForNewGame();
        };
    };
    return GameMenu;
});