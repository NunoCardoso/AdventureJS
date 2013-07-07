/*global define, createjs, Mustache, $ */

/**
 * This module bootstraps the game editor
 */
define([
    'text!templates/parent.mustache',
    'text!templates/main.mustache'
], function (
    parent,
    tabmain
) {
    var editor = function (game) {

        var partials = {
            'tab-main' : tabmain
        };

        var start = function () {
            $('body').html(Mustache.render(parent, game, partials));
            $("#tabs").tabs();
        };

        return {
            'start' : start
        };
    };
    return editor;
});