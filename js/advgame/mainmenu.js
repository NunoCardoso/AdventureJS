define([
], function() {

    var renderMenu = function (canvasX, canvasY, omain, queue) {

        main = {};

        // Title
        main.title = new createjs.Text(omain.title, "20px Arial", "#FFFFFF");
        main.title.textAlign = "center";
        main.title.textBaseline = "middle";
        main.title.x = canvasX / 2;
        main.title.y = 20;

        // Author
        main.author = new createjs.Text(omain.author, "17px Arial", "#CCCCCC");
        main.author.textAlign = "center";
        main.author.textBaseline = "middle";
        main.author.x = canvasX / 2;
        main.author.y = 50;

        // Description
        main.description = new createjs.Text(omain.description, "14px Arial", "#FFFFFF");
        main.description.textAlign = "center";
        main.description.textBaseline = "middle";
        main.description.x = canvasX / 2;
        main.description.y = 100;

        // Main Background
        main.background = new createjs.Bitmap(queue.getResult(omain.background));
        main.background.scaleX = canvasX / main.background.image.width;
        main.background.scaleY = canvasY / main.background.image.height;

        // start button
        main.startButton = new createjs.Shape();
        main.startButton.name = "startButton";
        width = 200;
        x = canvasX / 2 - width / 2;
        y = 150;
        height = 60;
        round = 10;
        main.startButton.graphics.beginFill("red").drawRoundRect(x, y, width, height, round);

        // start button label
        main.startButtonLabel = new createjs.Text("start game!", "bold 24px Arial", "#FFFFFF");
        main.startButtonLabel.textAlign = "center";
        main.startButtonLabel.textBaseline = "middle";
        main.startButtonLabel.x = canvasX / 2;
        main.startButtonLabel.y = 150 + height / 2;

        return main;
    }

    var display = function (main, stage) {
        var bottom = new createjs.Container();
        var middle = new createjs.Container();

        bottom.addChild(
           main.background,
           main.title,
           main.author,
           main.description
        );

        middle.addChild(
           main.startButton,
           main.startButtonLabel//,
//           PC
        );

        stage.autoClear = false;
        stage.addChild(bottom);
        stage.addChild(middle);
        return stage;
    };

    return {
        'renderMenu' : renderMenu,
        'display' : display
    }
});
