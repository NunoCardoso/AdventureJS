/*global define, createjs, document, $ */

/**
 * This module instantiates the stage singleton
 */
define([
    'engine/config',
    'engine/stage/stage',
    'engine/cursor/main',
    'engine/character/main'
], function (
    config,
    GameStage,
    gamecursor,
    gamecharacter
) {
    var stage,

        snapshot, // an image snapshot of this stage
        savegame, // a JSON snapshot of this stage

        preload = function (character) {
            stage = new GameStage("canvas");
        },

        getInstance = function () {
            return stage;
        },

        _onTick = function (event) {
            if (!event.paused) {
                gamecharacter.update(stage.getCurrentScene());
                stage.update(event);
            }
        },

        pause = function () {
            createjs.Ticker.setPaused(true);
        },

        play = function () {
            createjs.Ticker.setPaused(false);
        },

        update = function () {
            stage.update();
        },

        activateMouseAndTouch = function () {
            // make it faster.
            stage.autoClear = false;
            // allow mouseOver with a pool of 25 times per second
            stage.enableMouseOver(25);
            // enable touch interactions if supported on the current device:
            createjs.Touch.enable(stage);

            stage.onMouseMove = function (e) {
                gamecursor.update(this, {x: e.stageX, y: e.stageY});
            };

        },

        activateTick = function () {
            // ticker
            createjs.Ticker.setFPS(40);
            createjs.Ticker.addEventListener("tick", _onTick);
        },

        takeSnapshot = function () {
            var tmpcanvas    = document.createElement("canvas");
            tmpcanvas.width  = config.get('screenshot.x');
            tmpcanvas.height = config.get('screenshot.y');
            var ctx = tmpcanvas.getContext('2d');
            ctx.drawImage($("canvas")[0], 0, 0, $("canvas").width(), $("canvas").height(),
                0, 0, tmpcanvas.width, tmpcanvas.height);
            snapshot = tmpcanvas.toDataURL('image/jpg');
        },

        getSnapshot = function () {
            return snapshot;
        },

        setSavegame = function (_savegame) {
            savegame = _savegame;
        },

        getSavegame = function () {
            return savegame;
        };

    return {
        'preload'      : preload,
        'getInstance'  : getInstance,
        'takeSnapshot' : takeSnapshot,
        'getSnapshot'  : getSnapshot,
        'setSavegame'  : setSavegame,
        'getSavegame'  : getSavegame,
        'activateTick' : activateTick,

        'pause' : pause,
        'play' : play,
        'update' : update,

        'activateMouseAndTouch' : activateMouseAndTouch,

    };
});
