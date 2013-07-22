/*global define, createjs, $ */

/**
 * This module handles the game main menu
 */
define([
    'engine/config',
    'engine/lib/assets',
    'engine/menu/newgamebutton',
    'engine/menu/savegamebutton',
    'engine/menu/loadgamebutton',
    'engine/menu/resumegamebutton',
    'engine/menu/settingsbutton'
], function (
    config,
    assets,
    NewGameButton,
    SaveGameButton,
    LoadGameButton,
    ResumeGameButton,
    SettingsButton
) {

    var GameMenu = function (options) {
        this.initialize(options);
    };

    GameMenu.prototype = new createjs.Container();
    GameMenu.prototype.GameMenu_initialize = GameMenu.prototype.initialize;
    GameMenu.prototype.initialize = function (options) {

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

        this.newGameButton = new NewGameButton({
            x: config.get('button1of2.x'),
            y: config.get('button1of2.y'),
            w: config.get('button.w'),
            h: config.get('button.h'),
            r: config.get('button.r'),
            to: options.startingScene
        });

        this.loadGameButton = new LoadGameButton({
            x: config.get('button2of2.x'),
            y: config.get('button2of2.y'),
            w: config.get('button.w'),
            h: config.get('button.h'),
            r: config.get('button.r'),
            to: options.startingScene
        });

        this.saveGameButton = new SaveGameButton({
            x: config.get('button1of3.x'),
            y: config.get('button1of3.y'),
            w: config.get('button.w'),
            h: config.get('button.h'),
            r: config.get('button.r'),
            to: options.startingScene
        });


        this.loadGameButton = new LoadGameButton({
            w: config.get('button.w'),
            h: config.get('button.h'),
            r: config.get('button.r'),
            to: options.startingScene
        });

        this.resumeGameButton = new ResumeGameButton({
            x: config.get('button3of3.x'),
            y: config.get('button3of3.y'),
            w: config.get('button.w'),
            h: config.get('button.h'),
            r: config.get('button.r'),
            to: options.startingScene
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