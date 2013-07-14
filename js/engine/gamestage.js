/*global Tween, $, createjs, define */

/**
 * This module handles everything that has to do with stage.
 * on the Tick, it reads game props, then renders the stage
 */
define([
    'engine/gameconfig',
    'engine/character/main'
], function (
    gameconfig,
    playablecharacter
) {

    var stage,
        stashedScenes = {},
        stashedConsole,

        update = function () {
            stage.update();
        },

        // use only for console debug, please
        getStage = function () {
            return stage;
        },

        addChild = function (container) {
            stage.addChild(container);
        },

        removeChild = function (container) {
            stage.removeChild(container);
        },

        stashScene = function (scene) {
            stashedScenes[scene.name] = scene;
        },

        getStashedScene = function (key) {
            return stashedScenes[key];
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

        switchScene = function (_fromscene, _toscene) {
            var fromscene = stage.getChildByName(_fromscene);
            var toscene   = stashedScenes[_toscene];
            createjs.Tween.get(fromscene).to({alpha: 0}, 500).call(function () {
                stage.removeChild(fromscene);
                toscene.alpha = 0;
                stage.addChild(toscene);
                createjs.Tween.get(toscene).to({alpha: 1}, 500).call(function () {
                });
            });
        },

        onTick = function (event) {
            playablecharacter.updatePosition();
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
        'stashConsole' : stashConsole,
        'getConsole' : getConsole,
        'removeStashedScene' : removeStashedScene,
        'getStashedScene' : getStashedScene,
        'getChildByName' : getChildByName,
        'update': update,
        'getStage' : getStage,
        'switchScene' : switchScene
    };
});