/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/assets',
    'engine/gamestage',
    'engine/gameconfig',
    'engine/scene/main',
    'engine/menu/startbutton',
    'engine/menu/startbuttonlabel'
], function (
    assets,
    gamestage,
    gameconfig,
    GameScene,
    StartButton,
    StartButtonLabel
) {
    var main,
        nextScene,

        onStartButtonClick = function (e) {
            console.log("starting " + nextScene);
            gamestage.switchScene('scene.menu', 'scene.' + nextScene);
        },

        _prepare = function (omain) {

            main = {};
            nextScene = omain.startingScene;

            // Title
            main.title = new createjs.Text(omain.title, "20px the8bit", "#FFFFFF");
            main.title.textAlign = "center";
            main.title.textBaseline = "middle";
            main.title.x = gameconfig.getCanvasXY().x / 2;
            main.title.y = 20;

            // Author
            main.author = new createjs.Text(omain.author, "17px the8bit", "#CCCCCC");
            main.author.textAlign = "center";
            main.author.textBaseline = "middle";
            main.author.x = gameconfig.getCanvasXY().x / 2;
            main.author.y = 50;

            // Description
            main.description = new createjs.Text(omain.description, "14px the8bit", "#FFFFFF");
            main.description.textAlign = "center";
            main.description.textBaseline = "middle";
            main.description.x = gameconfig.getCanvasXY().x / 2;
            main.description.y = 100;

            // Main Background
            main.background = new createjs.Bitmap(assets.getQueueLoaded().getResult(omain.background));
            main.background.scaleX = gameconfig.getCanvasXY().x / main.background.image.width;
            main.background.scaleY = gameconfig.getCanvasXY().y / main.background.image.height;
            main.background.name = "background";

            // start button
            main.startButton = new StartButton();
            main.startButtonLabel = new StartButtonLabel();
        },

        render = function (omain) {

            var scene = new GameScene({id: 'menu'});

            _prepare(omain);

            scene.addChild(
                main.background,
                main.title,
                main.author,
                main.description,
                main.startButton,
                main.startButtonLabel
            );

            gamestage.stashScene(scene);
            gamestage.switchScene('scene.start', scene.name);

            main.startButton.addEventListener("click", $.proxy(onStartButtonClick, this));
        };

    return {
        'render' : render
    };
});