/*global $, createjs, define */

/**
 * This module handles everything that has to do with stage.
 * on the Tick, it reads game props, then renders the stage
 */
define([
    'advgame/gameprops'
], function (gameprops) {

    var stage,
        clickedX,
        clickedY,
        canvasX,
        canvasY,

        addChild = function (container) {
            stage.addChild(container);
        },

        getCanvasX = function () {
            return canvasX;
        },

        getCanvasY = function () {
            return canvasY;
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
            var props = gameprops.get();
            if (props.pc) {
                props.pc.updatePosition(clickedX, clickedY);
            }
            stage.update(event);
        },

        init = function () {
            stage = new createjs.Stage("canvas");
            canvasX = $("#canvas").width();
            canvasY = $("#canvas").height();

            // make it faster.
            stage.autoClear = false;

            // listener on stage
            // mousedown allows press event on objects above the stage to be captured
            stage.addEventListener("mousedown", $.proxy(onStageMouseDown, this));

            // listener on button
            //    _.main.startButton.addEventListener("press", $.proxy(onStartButtonPress, this));
            //    _.main.startButton.addEventListener("mouseover", $.proxy(onStartButtonMouseOver, this));



            // ticker
            createjs.Ticker.setFPS(40);
            createjs.Ticker.addEventListener("tick", $.proxy(onTick, this));
        };

    return {
        'init' : init,
        'addChild' : addChild,
        'getCanvasX' : getCanvasX,
        'getCanvasY' : getCanvasY,

    };
});