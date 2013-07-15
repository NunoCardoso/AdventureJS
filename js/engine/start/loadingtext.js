/*global define, createjs */

/**
 * This is the loading... label
 */
define([
    'engine/config'
], function (
    config
) {
    var LoadingText = function (options) {
        this.initialize(options);
    };

    LoadingText.prototype = new createjs.Text(config.get('loading'), "16px the8bit", "#FFFFFF");
    LoadingText.prototype.LoadingText_initialize = LoadingText.prototype.initialize;
    LoadingText.prototype.initialize = function (options) {
        this.textAlign = "center";
        this.textBaseline = "top";
        this.x = config.get('game.w') / 2;
        this.y = config.get('loading.y');
    };
    return LoadingText;
});