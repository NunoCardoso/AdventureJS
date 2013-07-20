/*global define, createjs, $, document */

/**
 * This module handles exit areas from game scenes
 */
define([
    'engine/condition/main',
    'engine/config',
    'engine/lib/assets',
    'engine/object/main',
    'engine/interaction/action',
    'require'
], function (
    gamecondition,
    config,
    assets,
    gameobject,
    action,
    require
) {
    var Exit = function (options, from) {
        this.initialize(options, from);
    };

    Exit.prototype = new createjs.Shape();
    Exit.prototype.Exit_initialize = Exit.prototype.initialize;
    Exit.prototype.initialize = function (exit) {
        // if it is 0, it is invisible, and won't trigger cursor changes
        this.alpha = 0.01;
        this.label = exit.name || 'exit';
        this.graphics
            .beginFill("black")
            .drawRect(
                exit.x,
                exit.y,
                exit.w,
                exit.h
            );
        this.arrow = exit.arrow;
        this.from  = exit.from;
        this.to    = exit.to;
        this.characterPosition = exit.characterPosition;
        this.condition = undefined;

        if (exit.condition) {
            this.condition = gamecondition.get(exit.condition);
        }

        this.hasCondition = function () {
            return typeof this.condition !== 'undefined';
        };

        this.testCondition = function () {
            if (this.condition.isInInventory !== 'undefined') {
                if (require('engine/panel/main').isInInventory(this.condition.isInInventory)) {
                    return this.condition.onSuccess || true;
                } else {
                    return this.condition.onFail || false;
                }
            }
        };

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
                playableCharacter.actForExitClick(e, this);
            }, this));
        };
    };
    return Exit;
});