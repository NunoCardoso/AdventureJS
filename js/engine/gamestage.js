/*global $, createjs, define */

/**
 * This module handles everything that has to do with stage.
 * on the Tick, it reads game props, then renders the stage
 */
define([
    'engine/gameconfig'
], function (
    gameconfig
) {

    var stage,
        stashedScenes = {},
        stashedPlayableCharacter,
        stashedConsole,
        clickedXY,

        update = function () {
            stage.update();
        },

        addChild = function (container) {
            stage.addChild(container);
        },

        removeChild = function (container) {
            stage.removeChild(container);
        },

        stashScene = function (key, scene) {
            stashedScenes[key] = scene;
        },

        getStashedScene = function (key) {
            return stashedScenes[key];
        },

        stashPlayableCharacter = function (character) {
            stashedPlayableCharacter = character;
        },

        getPlayableCharacter = function () {
            return stashedPlayableCharacter;
        },

        stashConsole = function (console) {
            stashedConsole = console;
        },

        getConsole = function () {
            return stashedConsole;
        },

        removeStashedScene = function (key) {
            delete stashedScenes[key];
        },

        getChildByName = function (name) {
            return stage.getChildByName(name);
        },

        switchToScene = function (scenename) {
            stage.addChild(stashedScenes[scenename]);
        },

        removeScene = function (scenename) {
            stage.removeChild(stage.getChildByName(scenename));
        },

        setClickedXY = function (xy) {
            clickedXY = xy;
        },

        onTick = function (event) {
            var container = stage.getChildByName('pcContainer'),
                pc;
            if (container) {
                pc = container.getChildByName('you');
            }
            if (pc && clickedXY) {
                if (pc.updatePosition) {
                    pc.updatePosition(clickedXY);
                }
            }
            stage.update(event);
        },

        init = function () {
            stage = new createjs.Stage("canvas");
            gameconfig.setCanvasXY({
                x : $("#canvas").width(),
                y : $("#canvas").height()
            });
        },

        activate = function () {
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
        'activate' : activate,
        'addChild' : addChild,
        'removeChild' : removeChild,
        'stashScene' : stashScene,
        'getStashScene' : getStashedScene,
        'stashPlayableCharacter' : stashPlayableCharacter,
        'getPlayableCharacter' : getPlayableCharacter,
        'stashConsole' : stashConsole,
        'getConsole' : getConsole,
        'removeStashedScene' : removeStashedScene,
        'getStashedScene' : getStashedScene,
        'getChildByName' : getChildByName,
        'setClickedXY' : setClickedXY,
        'update': update,
        'switchToScene' : switchToScene,
        'removeScene' : removeScene
    };
});