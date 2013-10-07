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
    'engine/cursor/main'
], function (
    gamecharacter,
    config,
    gamepanel,
    gamescene,
    sentence,
    gamecursor
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

        this.addBlackBackground = function () {
            var back = new createjs.Shape();

            back.graphics.beginFill("black")
                .drawRect(
                    0,
                    0,
                    config.get('game.w'),
                    config.get('game.h')
                );

            this.addChild(back);
        };

        this.reset = function () {
            this.removeAllChildren();
            this.addBlackBackground();
        };

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
        this.addMenuScene = function () {
            var self = this;
            var sceneindex = self.children.length - 1;

            this.notOnGame();

            var d = self.children[sceneindex].fadeOut();
            d.done(function () {
                var toscene = gamescene.get('scene.menu');
                toscene.alpha = 0;
                self.addChild(toscene);
                var menuindex = self.children.length - 1;

                var d2 = self.children[menuindex].fadeIn();
                d2.done(function () {
                    require('engine/stage/main').deactivate();
                    require('engine/game/music').playMusic(self.children[sceneindex].music);
                    // adding the menu pauses the ticker, so we need to manualy update
                    self.update();
                });
            });
        };

        // used to remove top scene (temporary menu)
        // only happens on play mode, so it's save for activateCursorOnPlay
        this.removeMenuScene = function (_toscene) {
            var self = this;

            self.onGame();

            var menuindex = self.children.length - 1;
            var sceneindex = self.children.length - 2;

            var d = self.children[menuindex].fadeOut();
            d.done(function () {
                // remove last one. which is the game menu
                self.removeChildAt(menuindex);
                var d2 = self.children[sceneindex].fadeIn();
                d2.done(function () {
                    require('engine/stage/main').activateCursorFor('play');
                });
            });
        };

        this.switchScene = function (_toscene, _toExit) {
            var self      = this,
                fromindex = self.children.length - 1,
                toscene   = gamescene.get(_toscene),
                stagemain = require('engine/stage/main');

            var d = self.children[fromindex].fadeOut();
            d.done(function () {
                self.removeChildAt(fromindex);

                if (toscene.isInteractable()) {
                    toscene.render({
                        'toExit' : _toExit
                    });
                }

                if (toscene.isPlayable()) {
                    self.onGame();
                    if (stagemain.isPlayable()) {
                        stagemain.activateCursorFor('play');
                    }
                    if (stagemain.isEditable()) {
                        stagemain.activateCursorFor('editor');
                    }
                } else {
                    self.notOnGame();
                    stagemain.deactivate();
                    stagemain.update();
                }

                toscene.alpha = 0;
                self.addChild(toscene);
                var sceneindex = self.children.length - 1;
                var d2 = self.children[sceneindex].fadeIn();
                d2.done(function () {

                    self.currentScene = toscene;

                    if (toscene.music) {
                        require('engine/game/music').playMusic(toscene.music);
                    }

                    self.update();

                    if (toscene.hasBeginCutscene()) {
                        toscene.performBeginCutscene();
                    }
                });
            });
        };

        this.setState = function (_toScene) {
            this.switchScene(_toScene);
        };
    };
    return GameStage;
});