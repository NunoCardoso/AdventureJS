/*global $, createjs, define */

/**
 * This module is the game stage class.
 * on the Tick event, it renders the stage on a certain FPS.
 */
define([
    'engine/config',
    'engine/pcharacter/main',
    'engine/scene/main'
], function (
    config,
    playablecharacter,
    gamescene
) {

    var GameStage = function () {
        this.initialize();
    };

    GameStage.prototype = new createjs.Stage("canvas");
    GameStage.prototype.GameStage_initialize = GameStage.prototype.initialize;
    GameStage.prototype.initialize = function () {
        this.GameStage_initialize();
        config.setCanvasXY({
            x : $("#canvas").width(),
            y : $("#canvas").height()
        });

        this.switchScene = function (_fromscene, _toscene) {
            // _fromscene is a name of a scene already on stage
            var fromscene = this.getChildByName(_fromscene);
            // toscene is a scene object, to add on stage.
            var toscene   = _toscene;
            createjs.Tween.get(fromscene).to({alpha: 0}, 500)
                .call($.proxy(function () {
                    this.removeChild(fromscene);
                    toscene.alpha = 0;
                    if (toscene.isInteractable()) {
                        this.addChild(toscene.getConsole());
                    }
                    this.addChild(toscene);

// TODO: call the new scene to render itself, with render();
// give it the actual console and the actual playablecharacter.

//TODO: add playable character, make him to register itself with the scene,
 // specially its backgrounds and exits, so it can collect click data
                    createjs.Tween.get(toscene).to({alpha: 1}, 500).call(function () {
                    });
                }, this));
        };

        this.onTick = function (event) {
            playablecharacter.updatePosition();
            this.update(event);
        };

        this.activate = function () {
            // make it faster.
            this.autoClear = false;
            // allow mouseOver with a pool of 25 times per second
            this.enableMouseOver(25);
            // ticker
            createjs.Ticker.setFPS(40);
            createjs.Ticker.addEventListener("tick", $.proxy(this.onTick, this));
        };
    };
    return GameStage;
});