/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/assets'
], function (
    assets
) {
    var GameObject = function (options) {
        this.initialize(options);
    };

    GameObject.prototype = new createjs.Bitmap();
    GameObject.prototype.GameObject_initialize = GameObject.prototype.initialize;
    GameObject.prototype.initialize = function (options) {
        this.GameObject_initialize();
        this.name = 'object.' + options.id;
        this.image = assets.getQueueLoaded().getResult(options.id);
        this.x = options.x;
        this.y = options.y;
    };
    return GameObject;
});
