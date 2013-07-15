/*global define, createjs, $ */

/**
 * This module handles the game main menu
 */
define([
    'engine/config',
    'engine/lib/assets',
    'engine/menu/startbutton',
    'engine/menu/startbuttonlabel',
    'engine/scene/scene',
    'engine/scene/main',
    'engine/stage/main'
], function (
    config,
    assets,
    StartButton,
    StartButtonLabel,
    Scene,
    gamescene,
    gamestage
) {
    var main,
        nextScene,

        onStartButtonClick = function (e) {
            gamestage.switchScene('scene.menu',
                gamescene.get('scene.' + nextScene)
                );
        },

        _prepare = function (options) {

            main = {};
            nextScene = options.startingScene;

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
            main.startButton = new StartButton();
            main.startButtonLabel = new StartButtonLabel();
        },

        render = function (options) {

            var scene = new Scene({id: 'menu'}); // scene name wil be scene.menu

            _prepare(options);

            scene.addChild(
                main.background,
                main.title,
                main.author,
                main.description,
                main.startButton,
                main.startButtonLabel
            );

            gamescene.add(scene);
            gamestage.switchScene('scene.start', gamescene.get(scene.name));

            main.startButton.addEventListener("click", $.proxy(onStartButtonClick, this));
        };

    return {
        'render' : render
    };
});