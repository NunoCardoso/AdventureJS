/*global define, createjs */

/**
 * This module handles main menu stuff
 */
define([
    'advgame/gameprops',
    'advgame/gamestage',
], function (gameprops, gamestage) {

    var main,

        prepare = function (omain, queue) {

            main = {};

            // Title
            main.title = new createjs.Text(omain.title, "20px Arial", "#FFFFFF");
            main.title.textAlign = "center";
            main.title.textBaseline = "middle";
            main.title.x = gamestage.getCanvasX() / 2;
            main.title.y = 20;

            // Author
            main.author = new createjs.Text(omain.author, "17px Arial", "#CCCCCC");
            main.author.textAlign = "center";
            main.author.textBaseline = "middle";
            main.author.x = gamestage.getCanvasX() / 2;
            main.author.y = 50;

            // Description
            main.description = new createjs.Text(omain.description, "14px Arial", "#FFFFFF");
            main.description.textAlign = "center";
            main.description.textBaseline = "middle";
            main.description.x = gamestage.getCanvasX() / 2;
            main.description.y = 100;

            // Main Background
            main.background = new createjs.Bitmap(queue.getResult(omain.background));
            main.background.scaleX = gamestage.getCanvasX() / main.background.image.width;
            main.background.scaleY = gamestage.getCanvasY() / main.background.image.height;

            // start button
            main.startButton = new createjs.Shape();
            main.startButton.name = "startButton";
            var width = 200;
            var x = gamestage.getCanvasX() / 2 - width / 2;
            var y = 150;
            var height = 60;
            var round = 10;
            main.startButton.graphics.beginFill("red").drawRoundRect(x, y, width, height, round);

            // start button label
            main.startButtonLabel = new createjs.Text("start game!", "bold 24px Arial", "#FFFFFF");
            main.startButtonLabel.textAlign = "center";
            main.startButtonLabel.textBaseline = "middle";
            main.startButtonLabel.x = gamestage.getCanvasX() / 2;
            main.startButtonLabel.y = 150 + height / 2;

            gameprops.set('main', main);
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
        };

    return {
        'prepare' : prepare,
        'render' : render
    };
});