/*global define, createjs, $, document */

/**
 * This module handles exit areas from game scenes
 */
define([
    'engine/config',
    'engine/lib/assets',
    'engine/object/main',
    'engine/pcharacter/main',
    'engine/scene/main',
    'engine/stage/main'
], function (
    config,
    assets,
    gameobject,
    playablecharacter,
    gamescene,
    gamestage
) {
    var Exit = function (options, from) {
        this.initialize(options, from);
    };

    Exit.prototype = new createjs.Shape();
    Exit.prototype.Exit_initialize = Exit.prototype.initialize;
    Exit.prototype.initialize = function (exit, from) {
        // if it is 0, it is invisible, and won't trigger cursor changes
        this.alpha = 0.01;
        this.graphics
            .beginFill("black")
            .drawRect(
                exit.x,
                exit.y,
                exit.w,
                exit.h
            );
        this.arrow = exit.arrow;
        this.from  = from;
        this.to    = exit.to;

        this.addEventListener("mouseover", $.proxy(function (e) {
            $("#canvas").attr('class', 'exit' + this.arrow);
        }, this));

        this.addEventListener("mouseout", $.proxy(function (e) {
            $("#canvas").attr('class', 'crosshair');
        }, this));

        /**
         * call this function so that this background
         * dispatches click events to the playable character
         */
        this.activateClickListener = function (playableCharacter) {
            this.addEventListener("click", $.proxy(function (e) {
                playablecharacter.get()
                    .setClickedXY({x : e.stageX, y : e.stageY})
                    .setWhenFinished($.proxy(function () {
                        gamestage.switchScene(
                            'scene.' + this.from,
                            gamescene.get('scene.' + this.to)
                        );
                    }, this));
            }, this));
        };
    };
    return Exit;
});