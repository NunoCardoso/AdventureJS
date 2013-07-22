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
    'engine/sentence/main'
], function (
    gamecharacter,
    config,
    gamepanel,
    gamescene,
    sentence
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

        this.getCurrentScene = function () {
            return this.currentScene;
        };

        this.getState = function () {
            return this.currentScene.name;
        };

        // used to add a scene over a scene (temporary menu)
        this.addMenuScene = function (_toscene) {
            var toscene   = gamescene.get(_toscene);
            this.addChild(toscene);
            // adding the menu pauses the ticker, so we need to manualy update
            this.update();
        };

        // used to remove top scene (temporary menu)
        this.removeMenuScene = function (_toscene) {
            var toscene   = gamescene.get(_toscene);
            this.removeChild(toscene);
        };

        this.setState = function (_currentScene) {
            this.removeAllChildren();
            var toscene = gamescene.get(_currentScene);
            this.addChild(toscene);
            this.currentScene = toscene;
        };

        this.switchScene = function (_fromscene, _toscene, characterPosition) {
            // _fromscene is a name of a scene already on stage
            var fromscene = this.getChildByName(_fromscene);
            // toscene is a name of a scene to render.
            var toscene   = gamescene.get(_toscene);

            this.removeChild(fromscene);

            if (toscene.isInteractable()) {

                toscene.render({
                    'playableCharacter'     : gamecharacter.getPlayableCharacter(),
                    'nonPlayableCharacters' : gamecharacter.getNonPlayableCharacters(),
                    'panel'                 : gamepanel.get(),
                    'sentence'              : sentence.get(),
                    'characterPosition'     : characterPosition
                });
            }

            this.addChild(toscene);
            this.currentScene = toscene;
        };
    };
    return GameStage;
});