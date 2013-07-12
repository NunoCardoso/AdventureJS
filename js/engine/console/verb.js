/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/gameconfig'
], function (
    gameconfig
) {
    var Verb = function (label) {
        this.initialize(label);
    };

    Verb.prototype = new createjs.Text(gameconfig.get('console.action.defaultText'), "20px the8bit", "#FFFFFF");
    Verb.prototype.Text_initialize = Verb.prototype.initialize;
    Verb.prototype.initialize = function (label) {
        this.Text_initialize();
        this.action.textAlign = "center";
        this.action.textBaseline = "top";
    };
    return Verb;
});
