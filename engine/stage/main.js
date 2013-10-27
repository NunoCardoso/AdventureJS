/*global define, createjs, document, $ */

/**
 * This module instantiates the stage singleton
 */
define([
    'engine/config',
    'engine/stage/stage',
    'engine/character/main',
    'engine/cursor/main'
], function (
    config,
    GameStage,
    gamecharacter,
    gamecursor
) {
    var stage,

        snapshot, // an image snapshot of this stage
        savegame, // a JSON snapshot of this stage

        _onMouseDown = false,
        _onDragging = false,
        _role,

        _evt,

        preload = function (options) {
            stage = new GameStage(options.canvas);
            _role = options.role;
        },

        get = function () {
            return stage;
        },

        _onTick = function (event) {
            if (!event.paused) {
                var scene = stage.getCurrentScene();
                if (scene.isInteractable()) {
                    scene.getPc().update(scene);
                    var i, npcs = scene.getNpcs();
                    for (i in npcs) {
                        npcs[i].update(scene);
                    }
                }                    
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

        activate = function () {
            // make it faster.
            stage.autoClear = false;
            // allow mouseOver with a pool of 25 times per second
            stage.enableMouseOver(25);
            // enable touch interactions if supported on the current device:
            createjs.Touch.enable(stage);
        },

        isPlayable = function () {
            return _role === 'play';
        },

        isEditable = function () {
            return _role === 'editor';
        },

        activateCursorFor = function (role) {
            gamecursor.setStage(stage);

            stage.addEventListener('stagemousedown', function (evt) {
                if (! (_evt && _evt.timeStamp === evt.timeStamp)) {
                    _onMouseDown = true;
                    _evt = evt;
                }
            });

            stage.addEventListener("stagemousemove", function (evt) {
                if (! (_evt && _evt.timeStamp === evt.timeStamp)) {
                    if (_onMouseDown) {
                        _onDragging = true;
                        gamecursor.drag({x: evt.stageX, y: evt.stageY}, role);
                    } else {
                        gamecursor.update({x: evt.stageX, y: evt.stageY}, role);
                    }
                    _evt = evt;
                }
            });
        
            stage.addEventListener('stagemouseup', function (evt) {
                if (! (_evt && _evt.timeStamp === evt.timeStamp)) {
                    _onMouseDown = false;
                    if (_onDragging) {
                        gamecursor.reset();
                        _onDragging = false;
                        gamecursor.undrag({x: evt.stageX, y: evt.stageY}, role);
                    } else {
                        gamecursor.click({x: evt.stageX, y: evt.stageY}, role);
                    }
                    _evt = evt;
                }
            });
        },

        deactivate = function () {
            stage.removeEventListener('stagemousedown');
            stage.removeEventListener('stagemousemove');
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
        'get'          : get,
        'takeSnapshot' : takeSnapshot,
        'getSnapshot'  : getSnapshot,
        'setSavegame'  : setSavegame,
        'getSavegame'  : getSavegame,
        'activateTick' : activateTick,

        'pause'  : pause,
        'play'   : play,
        'update' : update,

        'activate' : activate,
        'activateCursorFor' : activateCursorFor,
        'deactivate'      : deactivate,

        'isPlayable' : isPlayable,
        'isEditable' : isEditable
    };
});
