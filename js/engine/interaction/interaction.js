/*global define, createjs, $ */

/**
 * This module is a game interaction class
 */
define([
], function (
) {
    var Interaction = function (options) {
        this.initialize(options);
    };

    Interaction.prototype = new createjs.Bitmap();
    Interaction.prototype.Interaction_initialize = Interaction.prototype.initialize;
    Interaction.prototype.initialize = function (options) {
        this.Interaction_initialize();
        this.name = options.id;
        this.verb = options.verb;
        this.first = options.first;
        this.second = options.second;
        this.actions = options.actions;
    };
    return Interaction;
});