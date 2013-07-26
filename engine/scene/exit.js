/*global define, createjs, $, document */

/**
 * This module handles exit areas from game scenes
 */
define([
    'engine/condition/main',
    'engine/config',
    'engine/cursor/main',
    'engine/lib/assets',
    'engine/object/main',
    'engine/interaction/action'
], function (
    gamecondition,
    config,
    gamecursor,
    assets,
    gameobject,
    action
) {
    var Exit = function (options) {
        this.initialize(options);
    };

    var p = Exit.prototype = new createjs.Shape();
    p.Exit_initialize = p.initialize;
    p.initialize = function (options) {
        this.Exit_initialize();

        // if it is 0, it is invisible, and won't trigger cursor changes
        this.alpha = 0.01;
        this.label = options.name || 'exit';
        this.graphics
            .beginFill("black")
            .drawRect(
                options.x,
                options.y,
                options.w,
                options.h
            );
        this.arrow = options.arrow;
        this.from  = options.from;
        this.to    = options.to;
        this.pc_xy = options.pc_xy;
        this.condition = undefined;

        if (options.condition) {
            this.condition = gamecondition.get(options.condition);
        }

        this.hasCondition = function () {
            return typeof this.condition !== 'undefined';
        };

        this.testCondition = function () {
            if (this.condition.isInInventory !== 'undefined') {
                if (require('engine/panel/main').isInInventory(this.condition.isInInventory)) {
                    return {conditionMet: true, nowDo: this.condition.onSuccess};
                }
                return {conditionMet: false, nowDo: this.condition.onFail};
            }
        };

        this.testClick = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseClick = this.hitTest(coords.x, coords.y);
            if (mouseClick) {
                scene.getPc().actForExitClick({x : x, y : y}, this);
                return true;
            }
            return false;
        };

        this.testHit = function (x, y, scene) {
            var coords = this.globalToLocal(x, y);
            var mouseOver = this.hitTest(coords.x, coords.y);
            if (mouseOver && !this.isMouseOver) {
                this.isMouseOver = mouseOver;
                gamecursor.changeTo('image.cursor.' + this.arrow);
                return action.mouseOverExit(this);
            }

            if (!mouseOver && this.isMouseOver) {
                this.isMouseOver = mouseOver;
                $("#canvas").attr('class', '');
                gamecursor.reset();
                return action.mouseOutExit(this);
            }
        };
    };
    return Exit;
});