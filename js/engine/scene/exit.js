/*global define, createjs, $, document */

/**
 * This module handles main menu stuff
 */
define([
    'engine/assets',
    'engine/gameconfig',
    'engine/gamestage',
    'engine/character/main',
    'engine/console/main',
    'engine/object/main'
], function (
    assets,
    gameconfig,
    gamestage,
    playablecharacter,
    gameconsole,
    gameobject
) {
    var Exit = function (options) {
        this.initialize(options);
    };

    Exit.prototype = new createjs.Shape();
    Exit.prototype.Exit_initialize = Exit.prototype.initialize;
    Exit.prototype.initialize = function (exit) {
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
        this.addEventListener("mouseover", $.proxy(function (e) {
            $("#canvas").attr('class', 'exit' + this.arrow);
        }, this));

        this.addEventListener("mouseout", $.proxy(function (e) {
            $("#canvas").attr('class', 'crosshair');
        }, this));

        this.addEventListener("click", $.proxy(function (e) {
            playablecharacter.get().setClickedXY({x : e.stageX, y : e.stageY});
        }, this));
    };
    return Exit;
});