/*global Tween, $, createjs, define */

/**
 * This module handles everything that has to do with stage.
 * on the Tick, it reads game props, then renders the stage
 */
define([
    'engine/gameconfig',
    'engine/scene/main',
    'engine/character/main'
], function (
    gameconfig,
    gamescene,
    playablecharacter
) {

    var stage,

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

        getChildByName = function (name) {
            return stage.getChildByName(name);
        },

        switchScene = function (_fromscene, _toscene) {
            // _fromscene is a name of a scene already on stage
            var fromscene = stage.getChildByName(_fromscene);
            // toscene is a scene object, to add on stage.
            var toscene   = _toscene;
            createjs.Tween.get(fromscene).to({alpha: 0}, 500)
                .call($.proxy(function () {
                    stage.removeChild(fromscene);
                    toscene.alpha = 0;
                    stage.addChild(toscene);
                    createjs.Tween.get(toscene).to({alpha: 1}, 500).call(function () {
                    });
                }, this));
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
        'getChildByName' : getChildByName,
        'update': update,
        'getStage' : getStage,
        'switchScene' : switchScene
    };
});