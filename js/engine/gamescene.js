/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([], function () {
    var GameScene = function (options) {
        this.initialize(options);
    };

    GameScene.prototype = new createjs.Container();
    GameScene.prototype.GameScene_initialize = GameScene.prototype.initialize;
    GameScene.prototype.initialize = function (options) {
        this.GameScene_initialize();
        this.name = options.name;
    };
    return GameScene;
});
