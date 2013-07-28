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

        this.name = options.id;
        this.role = options.role;
        this.to   = options.to;

        this.isMouseOver = false;

        this.condition = undefined;
        if (options.condition) {
            this.condition = gamecondition.get(options.condition);
        }

        // TO BE CONFIGURED ON A RENDER() CALL
        this.arrow = undefined;
        this.label = undefined;
        this.testClick = undefined;
        this.testHit   = undefined;

        this.hasCondition = function () {
            return typeof this.condition !== 'undefined';
        };

        this.render = function (options) {
            // if it is 0, it is invisible, and won't trigger cursor changes
            this.alpha = 0.5;

            this.label = options.label;
            this.arrow = options.arrow;

            // I do not want to fix x or y, or the global coordinates are gone
            this.xx = options.x;
            this.yy = options.y;
            this.w = options.w;
            this.h = options.h;

            this.graphics.clear();
            this.graphics
                .beginFill("black")
                .drawRect(
                    this.xx,
                    this.yy,
                    this.w,
                    this.h
                );

            if (this.role === 'channel' || this.role === 'end') {
                this.testClick = function (x, y, scene) {
                    var coords = this.globalToLocal(x, y);
                    var mouseClick = this.hitTest(coords.x, coords.y);
                    if (mouseClick) {
                        scene.getPc().actForExitClick({x : x, y : y}, {
                            from: this,
                            to: this.to
                        });
                        return true;
                    }
                    return false;
                };

                if (this.role === 'end') {
                    this.arrow = 'end';
                }

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
            }
        };

        this.testCondition = function () {
            if (this.condition.isInInventory !== 'undefined') {
                if (require('engine/panel/main').isInInventory(this.condition.isInInventory)) {
                    return {conditionMet: true, nowDo: this.condition.onSuccess};
                }
                return {conditionMet: false, nowDo: this.condition.onFail};
            }
        };
    };
    return Exit;
});