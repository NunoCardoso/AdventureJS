/*global define, createjs, $ */

/**
 * This is the 
 */
define([
    'engine/gameconfig'
], function (
    gameconfig
) {
    var LoadingText = function (options) {
        this.initialize(options);
    };

    LoadingText.prototype = new createjs.Text(gameconfig.get('loading'), "16px the8bit", "#FFFFFF");
    LoadingText.prototype.LoadingText_initialize = LoadingText.prototype.initialize;
    LoadingText.prototype.initialize = function (options) {
        this.textAlign = "center";
        this.textBaseline = "top";
        this.x = gameconfig.get('game.w') / 2;
        this.y = gameconfig.get('progressbar.y') - 30;
    };
    return LoadingText;
});