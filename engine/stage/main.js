/*global define, createjs */

/**
 * This module instantiates the stage singleton
 */
define([
    'engine/stage/stage',
    'engine/character/main'
], function (
    GameStage,
    gamecharacter
) {

    var stage,

        preload = function (character) {
            stage = new GameStage("canvas");
        },

        getInstance = function () {
            return stage;
        },

        _onTick = function (event) {
            gamecharacter.updatePosition(stage.getCurrentScene());
            stage.update(event);
        },

        activate = function () {
            // make it faster.
            stage.autoClear = false;
            // allow mouseOver with a pool of 25 times per second
            stage.enableMouseOver(25);
            // enable touch interactions if supported on the current device:
            createjs.Touch.enable(stage);
            // ticker
            createjs.Ticker.setFPS(40);
            createjs.Ticker.addEventListener("tick", _onTick);
        };

    return {
        'preload'      : preload,
        'getInstance'  : getInstance,
        'activate'     : activate
    };
});
