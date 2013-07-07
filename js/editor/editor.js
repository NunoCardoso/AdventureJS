/*global define, createjs, Mustache, $ */

/**
 * This module bootstraps the game editor
 */
define([
  //  'editor/images'
], function (
//	images
) {
    var editor = function (game) {

        var start = function () {

            $.get('mst/parent.mustache', function (template) {
                $('body').html(Mustache.to_html(template, game));
                $("#tabs").tabs({

                    // other tabs
                    beforeLoad: function(event, ui) {
                        event.stopPropagation();
                        if (ui.tab.data("loaded")) {
                            event.preventDefault();
                            return;
                        }

                        ui.jqXHR.success(function(response) {
                            ui.tab.data( "loaded", true );
                            var html = Mustache.to_html(response, game);
                            ui.panel.html(html);
                            return;
                        });


                        ui.jqXHR.complete(function(response) {
                           console.log("hey");
                            return;
                        });

                    }
                });
            });
        };

        return {
            'start' : start
        };
    };
    return editor;
});