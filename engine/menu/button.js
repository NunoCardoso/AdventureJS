/*global define, createjs, $ */

/**
 * This is the start button on the game menu
 */
define([
    'engine/config',
    'engine/stage/main'
], function (
    config,
    gamestage
) {
    var Button = function (options) {
        this.initialize(options);
    };

    var p = Button.prototype = new createjs.Shape();
    Button.prototype.Button_initialize = Button.prototype.initialize;
    Button.prototype.initialize = function (options) {
        
    };
    return Button;
});