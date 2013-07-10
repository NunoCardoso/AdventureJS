/*global $, createjs, define */

/**
 * This module handles everything that has to do with stage.
 * on the Tick, it reads game props, then renders the stage
 */
define([
    'advgame/gameprops'
], function (gameprops) {

    var stage,
        clickedXY,
        canvasXY,

        addChild = function (container) {
            stage.addChild(container);
        },

        setClickedXY = function (xy) {
            clickedXY = xy;
        },

        getCanvasXY = function () {
            return canvasXY;
        },

        setCanvasXY = function (xy) {
            canvasXY = xy;
        },

        onTick = function (event) {
            var i,
                props = gameprops.get();
            if (props.characters && clickedXY) {
                for (i = 0; i < props.characters.length; i++) {
                    if (props.characters[i].updatePosition) {
                        props.characters[i].updatePosition(clickedXY);
                    }
                }
            }
            stage.update(event);
        },

        init = function () {
            stage = new createjs.Stage("canvas");
            canvasXY = {
                x : $("#canvas").width(),
                y : $("#canvas").height()
            };

            // make it faster.
            stage.autoClear = false;
            // allow mouseOver with a pool of 25 times per second
            stage.enableMouseOver(25);
            // ticker
            createjs.Ticker.setFPS(40);
            createjs.Ticker.addEventListener("tick", $.proxy(onTick, this));
        };

    return {
        'init' : init,
        'addChild' : addChild,
        'setClickedXY' : setClickedXY,
        'getCanvasXY' : getCanvasXY,
        'setCanvasXY' : setCanvasXY,
    };
});