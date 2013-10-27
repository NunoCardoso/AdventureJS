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

        // TO BE CONFIGURED ON A RENDER() CALL
        this.alpha = 0.01;

        this.label = options.label;
        this.arrow = options.arrow || 'default';


        this.test  = undefined;

        this.isMouseOver = false;

        this.condition = undefined;
        if (options.condition) {
            this.condition = gamecondition.get(options.condition);
        }

        this.hasCondition = function () {
            return this.condition !== undefined;
        };

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

        this.test = function (x, y, event, scene, role) {
            /*if (this.role === 'begin') {
                return true;
            }*/
            var coords = this.globalToLocal(x, y),
                mine   = this.hitTest(coords.x, coords.y);

            switch (event) {

            case 'click':
                if (mine) {
                    if (this.role === 'begin') {
                        return true;
                    }
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

        this.doExit = function (exitTo) {
            var proceed = true;
            if (this.hasCondition()) {
                // TODO: check properly the condition, once inventory is ready.
                this.condition.doTest();
            }
        };
    };
    return Exit;
});