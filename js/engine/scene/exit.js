/*global define, createjs, $, document */

/**
 * This module handles exit areas from game scenes
 */
define([
    'engine/config',
    'engine/lib/assets',
    'engine/object/main',
    'engine/pcharacter/main',
    'engine/interaction/action',
    'require'
], function (
    config,
    assets,
    gameobject,
    playablecharacter,
    action,
    require
) {
    var Exit = function (options, from) {
        this.initialize(options, from);
    };

    Exit.prototype = new createjs.Shape();
    Exit.prototype.Exit_initialize = Exit.prototype.initialize;
    Exit.prototype.initialize = function (exit, from) {
        // if it is 0, it is invisible, and won't trigger cursor changes
        this.alpha = 0.01;
        this.label = 'exit';
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
        this.characterPosition = exit.characterPosition;

        this.addEventListener("mouseover", $.proxy(function (e) {
            $("#canvas").attr('class', 'exit' + this.arrow);
            action.mouseOverExit(e);
        }, this));

        this.addEventListener("mouseout", $.proxy(function (e) {
            $("#canvas").attr('class', 'crosshair');
            action.mouseOutExit(e);
        }, this));

        /**
         * call this function so that this background
         * dispatches click events to the playable character
         */
        this.activateClickListener = function (playableCharacter) {
            this.addEventListener("click", $.proxy(function (e) {
                action.clickExit(e);
                playableCharacter.setClickedXY({x : e.stageX, y : e.stageY});
                playableCharacter.setWhenFinished($.proxy(function () {
                    require('engine/stage/main').getInstance().switchScene(
                        'scene.' + this.from,
                        'scene.' + this.to,
                        this.characterPosition
                    );
                }, this));
            }, this));
        };
    };
    return Exit;
});