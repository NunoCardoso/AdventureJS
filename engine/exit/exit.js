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
        this.test  = undefined;

        this.hasCondition = function () {
            return this.condition !== undefined;
        };

        this.render = function (options) {
            // if it is 0, it is invisible, and won't trigger cursor changes
            this.alpha = 0.01;

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
                this.test = function (x, y, event, scene, role) {
                    var coords = this.globalToLocal(x, y),
                        mine   = this.hitTest(coords.x, coords.y);

                    switch (event) {

                    case 'click':
                        if (mine) {
                            scene.getPc().actForExitClick({x : x, y : y}, {
                                from: this,
                                to: this.to
                            });
                            return true;
                        }
                        return false;
                    case 'hover':
                        if (mine && !this.isMouseOver) {
                            this.isMouseOver = mine;
                            gamecursor.changeTo('image.cursor.' + this.arrow);
                            return action.mouseOverExit(this);
                        }

                        if (!mine && this.isMouseOver) {
                            this.isMouseOver = mine;
                            $("#canvas").attr('class', '');
                            gamecursor.reset();
                            return action.mouseOutExit(this);
                        }
                        return false;
                    default:
                        return false;
                    }
                };

                if (this.role === 'end') {
                    this.arrow = 'end';
                }
            }
        };

        this.testCondition = function () {
            if (this.condition.isInInventory !== undefined) {
                if (require('engine/panel/main').isInInventory(this.condition.isInInventory)) {
                    return {conditionMet: true, nowDo: this.condition.onSuccess};
                }
                return {conditionMet: false, nowDo: this.condition.onFail};
            }
        };

        this.doExit = function (exitTo) {
            var proceed = true;
            if (this.hasCondition()) {
                // TODO: check properly the condition, once inventory is ready.
                var result = this.testCondition();
                proceed = result.conditionMet; // if conditionMet is false, it will prevent us from proceed.
                if (result && result.nowDo) {
                    action.reset();
                    require('engine/interaction/decision').perform(result.nowDo);
                }
            }

            if (proceed) {
               // game over!
                if (this.role === 'end') {
                    require('engine/achievement/main').publish('achievement.gameover');
                    return;
                }
                // have to find the scene that has the exits.to scene.
                // since exits and scenes are not rendered, I have to iterate scenes.
                var toScene = require('engine/scene/main').findSceneWithExit(exitTo);
                if (toScene) {
                    require('engine/stage/main').get().switchScene(
                        this.parent,
                        toScene,
                        exitTo
                    );
                }
            }
        };
    };
    return Exit;
});