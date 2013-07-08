/*global define, createjs, Mustache, $ */

/**
 * This module bootstraps the game editor
 */
define([
    'text!templates/parent.mustache',
    'text!templates/main.mustache',
    'text!templates/images.mustache',
    'text!templates/scenes.mustache',
    'text!templates/scene.mustache'
], function (
    parent,
    tabmain,
    tabimages,
    tabscenes,
    tabscene
) {
    var editor = function (game) {

        var partials = {
            'tab-main' : tabmain,
            'tab-images' : tabimages,
            'tab-scenes' : tabscenes,
            'tab-scene'  : tabscene
        };

        var start = function () {
            $('body').html(Mustache.render(parent, game, partials));
            $(".tabs").tabs();
            $( ".verticaltabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
            $( ".verticaltabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
            $(".tablesorter").tablesorter();
        };

        return {
            'start' : start
        };
    };
    return editor;
});