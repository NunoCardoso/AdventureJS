/*global define, createjs, $ */

define(
//    'advgame/Game',
    [
        'advgame/mainmenu',
        'advgame/preload'
    ],
    function (mainMenu, preload) {

        var game = function (options) {
            var o = options,
                stage,
                queue,
                canvasX,
                canvasY,
                clickedX,
                clickedY,
                speed = 2,

                // the internal objets
                _ = {},

                init = function () {
                    stage = new createjs.Stage("canvas");
                    canvasX = $("#canvas").width();
                    canvasY = $("#canvas").height();
                },

                notinit = function () {

                    // objects

                    // PC
                    _.PC = new createjs.BitmapAnimation(
                        new createjs.SpriteSheet({
                            images: [queue.getResult(o.PC.images)],
                            frames: o.PC.frames,
                            animations: o.PC.animations
                        })
                    );
                    _.PC.x = 0;
                    _.PC.y = 230;
                    _.PC.attitude = 'standright';
                    _.PC.gotoAndPlay(_.PC.attitude);

                    // listener on stage
                    // mousedown allows press event on objects above the stage to be captured
                    stage.addEventListener("mousedown", $.proxy(onStageMouseDown, this));

                    // listener on button 
                    _.main.startButton.addEventListener("press", $.proxy(onStartButtonPress, this));

                    _.main.startButton.addEventListener("mouseover", $.proxy(onStartButtonMouseOver, this));

                    // ticker
                    createjs.Ticker.setFPS(40);
                    createjs.Ticker.addEventListener("tick", $.proxy(onTick, this));
                },

                onStartButtonPress = function (e) {
                    console.log("start button press!");
                },

                onStartButtonMouseOver = function (e) {
                    console.log("start button mouse over!");
                },

                onStageMouseDown = function (e) {
                    console.log("stage click!");
                    clickedX = e.stageX;
                    clickedY = e.stageY;
                },

                onTick = function (event) {
                    // attitudes
                    if (_.PC.x > clickedX && (_.PC.x - clickedX > speed)) {
                        _.PC.attitude = "walkleft";
                    } else if (_.PC.x < clickedX  && (clickedX - _.PC.x > speed)) {
                        _.PC.attitude = "walkright";
                    } else {
                        if (_.PC.attitude === "walkleft") {
                            _.PC.attitude = "standleft";
                        } else if (_.PC.attitude === "walkright") {
                            _.PC.attitude = "standright";
                        }
                    }
                    if (_.PC.attitude === "walkleft") {
                        _.PC.x -= speed;
                    } else if (_.PC.attitude === "walkright") {
                        _.PC.x += speed;
                    }

                    // change attitude only if it is different
                    if (_.PC.currentAnimation !== _.PC.attitude) {
                        _.PC.gotoAndPlay(_.PC.attitude);
                    }
                    stage.update(event);
                },

                renderMainMenu = function () {
                    console.log('Images loaded');
                    _.main = mainMenu.renderMenu(canvasX, canvasY, o.main, queue);
                    stage = mainMenu.display(_.main, stage);
                    notinit();
                },

                start = function () {
                    init();
                    queue = preload.preloadImages({
                        images: o.images,
                        onComplete: renderMainMenu
                    });
                };
            return {
                'start' : start
            };
        };
        return game;
    }
);