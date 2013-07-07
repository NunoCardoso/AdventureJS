/*global $, createjs, define */

define([
    'advgame/gameprops'
], function (_) {

    var stage,
        clickedX,
        clickedY,
        canvasX,
        canvasY,

        set = function (_stage) {
            stage = _stage;
        },

        get = function () {
            return stage;
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
            var props = _.get();
            if (props.pc) {
                // attitudes
                if (props.pc.x > clickedX && (props.pc.x - clickedX > props.pc.speed)) {
                    props.pc.attitude = "walkleft";
                } else if (props.pc.x < clickedX  && (clickedX - props.pc.x > props.pc.speed)) {
                    props.pc.attitude = "walkright";
                } else {
                    if (props.pc.attitude === "walkleft") {
                        props.pc.attitude = "standleft";
                    } else if (props.pc.attitude === "walkright") {
                        props.pc.attitude = "standright";
                    }
                }
                if (props.pc.attitude === "walkleft") {
                    props.pc.x -= props.pc.speed;
                } else if (props.pc.attitude === "walkright") {
                    props.pc.x += props.pc.speed;
                }

                // change attitude only if it is different
                if (props.pc.currentAnimation !== props.pc.attitude) {
                    props.pc.gotoAndPlay(props.pc.attitude);
                }
            }
            stage.update(event);
        },

        init = function () {
            stage = new createjs.Stage("canvas");
            canvasX = $("#canvas").width();
            canvasY = $("#canvas").height();

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
        'set' : set,
        'get' : get,
        'getCanvasX' : getCanvasX,
        'getCanvasY' : getCanvasY
    };
});