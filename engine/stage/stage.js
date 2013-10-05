/*global $, createjs, define */

/**
 * This module is the game stage class.
 * on the Tick event, it renders the stage on a certain FPS.
 */
define([
    'engine/character/main',
    'engine/config',
    'engine/panel/main',
    'engine/scene/main',
    'engine/sentence/main',
    'engine/cursor/main',
    'engine/game/music'
], function (
    gamecharacter,
    config,
    gamepanel,
    gamescene,
    sentence,
    gamecursor,
    gamemusic
) {
    var GameStage = function (el) {
        this.initialize(el);
    };

    GameStage.prototype = new createjs.Stage();
    GameStage.prototype.GameStage_initialize = GameStage.prototype.initialize;
    GameStage.prototype.initialize = function (el) {
        this.GameStage_initialize(el);
        config.setCanvasXY({
            x : $("#canvas").width(),
            y : $("#canvas").height()
        });
        this.currentScene = undefined;

        this.onGame = function () {
            // that hides the cursor;
            $('#canvas').addClass('game');
        };

        this.notOnGame = function () {
            // that hides the cursor;
            $('#canvas').removeClass('game');
        };

        this.getCurrentScene = function () {
            return this.currentScene;
        };

        this.getState = function () {
            return this.currentScene.name;
        };

        // used to add a scene over a scene (temporary menu)
        this.addMenuScene = function (_toscene) {
            var toscene   = gamescene.get(_toscene);
            this.notOnGame();
            require('engine/stage/main').deactivate();
            this.addChild(toscene);
            gamemusic.playMusic(toscene.music);
            // adding the menu pauses the ticker, so we need to manualy update
            this.update();
        };

        // used to remove top scene (temporary menu)
        // only happens on play mode, so it's save for activateCursorOnPlay
        this.removeMenuScene = function (_toscene) {
            var toscene   = gamescene.get(_toscene);
            this.onGame();
            require('engine/stage/main').activateCursorFor('play');
            this.removeChild(toscene);
        };

        this.switchScene = function (_fromscene, _toscene, _toExit) {
            var fromscene = this.getChildByName(_fromscene),
                toscene   = gamescene.get(_toscene),
                stagemain = require('engine/stage/main');

            this.removeChild(fromscene);

            if (toscene.isInteractable()) {
                toscene.render({
                    'toExit' : _toExit
                });
            }

            if (toscene.isPlayable()) {
                this.onGame();
                if (stagemain.isPlayable()) {
                    stagemain.activateCursorFor('play');
                }
                if (stagemain.isEditable()) {
                    stagemain.activateCursorFor('editor');
                }
            } else {
                this.notOnGame();
                stagemain.deactivate();
                stagemain.update();
            }

            this.addChild(toscene);
            this.currentScene = toscene;

            if (toscene.music) {
                gamemusic.playMusic(toscene.music);
            }

            this.update();

            if (toscene.hasBeginCutscene()) {
                toscene.performBeginCutscene();
            }
        };

        this.setState = function (_toScene) {
            this.switchScene(this.currentScene, _toScene);
        };
    };
    return GameStage;
});