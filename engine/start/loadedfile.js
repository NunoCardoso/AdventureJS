/*global define, createjs */

/**
 * This displays the loaded file on start scene
 */
define([
    'engine/config'
], function (
    config
) {
    var LoadedFile = function (options) {
        this.initialize(options);
    };

    LoadedFile.prototype = new createjs.Text('', "12px the8bit", "#FFFFFF");
    LoadedFile.prototype.LoadedFile_initialize = LoadedFile.prototype.initialize;
    LoadedFile.prototype.initialize = function (options) {
        this.textAlign = "center";
        this.textBaseline = "top";
        this.x = config.get('game.w') / 2;
        this.y = config.get('loadedfile.y');
    };
    return LoadedFile;
});