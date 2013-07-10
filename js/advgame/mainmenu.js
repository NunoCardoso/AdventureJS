/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'advgame/gameprops',
    'advgame/gamestage',
], function (gameprops, gamestage) {

    var main,
        fixedHeight = 400,

        prepare = function (omain, queue) {

            main = {};

            // Title
            main.title = new createjs.Text(omain.title, "20px the8bit", "#FFFFFF");
            main.title.textAlign = "center";
            main.title.textBaseline = "middle";
            main.title.x = gamestage.getCanvasXY().x / 2;
            main.title.y = 20;

            // Author
            main.author = new createjs.Text(omain.author, "17px the8bit", "#CCCCCC");
            main.author.textAlign = "center";
            main.author.textBaseline = "middle";
            main.author.x = gamestage.getCanvasXY().x / 2;
            main.author.y = 50;

            // Description
            main.description = new createjs.Text(omain.description, "14px Arial", "#FFFFFF");
            main.description.textAlign = "center";
            main.description.textBaseline = "middle";
            main.description.x = gamestage.getCanvasXY().x / 2;
            main.description.y = 100;

            // Main Background
            main.background = new createjs.Bitmap(queue.getResult(omain.background));
            main.background.scaleX = gamestage.getCanvasXY().x / main.background.image.width;
            main.background.scaleY = fixedHeight / main.background.image.height;

            // start button
            main.startButton = new createjs.Shape();
            main.startButton.name = "startButton";
            var width = 200;
            var x = gamestage.getCanvasXY().x / 2 - width / 2;
            var y = 150;
            var height = 60;
            var round = 10;
            main.startButton.alpha = 0.5;
            main.startButton.graphics.beginFill("red").drawRoundRect(x, y, width, height, round);

            // start button label
            main.startButtonLabel = new createjs.Text("start game!", "bold 24px Arial", "#FFFFFF");
            main.startButtonLabel.textAlign = "center";
            main.startButtonLabel.textBaseline = "middle";
            main.startButtonLabel.x = gamestage.getCanvasXY().x / 2;
            main.startButtonLabel.y = 150 + height / 2;

            gameprops.set('main', main);
        },

        onBackgroundClick = function (e) {
            console.log("main menu background click!");
            gamestage.setClickedXY({x : e.stageX, y : e.stageY});
        },

        onStartButtonClick = function (e) {
            console.log("start button click!");
        },

        onStartButtonMouseOver = function (e) {
            console.log("start button click!");
            main.startButton.alpha = 1;
        },

        onStartButtonMouseOut = function (e) {
            console.log("start button click!");
            main.startButton.alpha = 0.5;
        },

        render = function () {
            var bottom = new createjs.Container(),
                middle = new createjs.Container();

            main = gameprops.get('main');

            bottom.addChild(
                main.background,
                main.title,
                main.author,
                main.description
            );

            middle.addChild(
                main.startButton,
                main.startButtonLabel
            );

            gamestage.addChild(bottom);
            gamestage.addChild(middle);

            main.background.addEventListener("click", $.proxy(onBackgroundClick, this));
            main.startButton.addEventListener("click", $.proxy(onStartButtonClick, this));
            main.startButton.addEventListener("mouseover", $.proxy(onStartButtonMouseOver, this));
            main.startButton.addEventListener("mouseout", $.proxy(onStartButtonMouseOut, this));

            /*   onStartButtonMouseOver = function (e) {
                console.log("start button mouse over!");
            },
            */
            //    _.main.startButton.addEventListener("mouseover", $.proxy(onStartButtonMouseOver, this));
        };

    return {
        'prepare' : prepare,
        'render' : render
    };
});