/*global define, createjs, $ */

/**
 * This is the 
 */
define([
    'engine/gameconfig'
], function (
    gameconfig
) {
    var LoadedFile = function (options) {
        this.initialize(options);
    };

    LoadedFile.prototype = new createjs.Text('', "12px the8bit", "#FFFFFF");
    LoadedFile.prototype.LoadedFile_initialize = LoadedFile.prototype.initialize;
    LoadedFile.prototype.initialize = function (options) {
        this.textAlign = "center";
        this.textBaseline = "top";
        this.x = gameconfig.get('game.w') / 2;
        this.y = gameconfig.get('progressbar.y') + 30;
    };
    return LoadedFile;
});