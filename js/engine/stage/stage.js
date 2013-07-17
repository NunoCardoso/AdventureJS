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

        this.switchScene = function (_fromscene, _toscene, characterPosition) {
            // _fromscene is a name of a scene already on stage
            var fromscene = this.getChildByName(_fromscene);
            // toscene is a name of a scene to render.
            var toscene   = gamescene.get(_toscene);

            createjs.Tween.get(fromscene)
                .to({alpha: 0}, 500)
                .call($.proxy(function () {

                    this.removeChild(fromscene);
                    toscene.alpha = 0;

                    if (toscene.isInteractable()) {

                        toscene.render({
                            'panel'                 : gamepanel.get(),
                            'sentence'              : sentence.get(),
                            'playableCharacter'     : gamecharacter.getPlayableCharacter(),
                            'nonPlayableCharacters' : gamecharacter.getNonPlayableCharacters(),
                            'characterPosition'     : characterPosition
                        });
                    }

                    this.addChild(toscene);

                    createjs.Tween.get(toscene).to({alpha: 1}, 500).call(function () {
                        console.log('Scene loaded');
                    });
                }, this));
        };
    };
    return GameStage;
});