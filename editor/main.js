/*global define, jQuery */

/**
 * This module will initialize the editor for a certain game 
 */

define([
	'editor/editor',
	'games/compass/compass'
], function (GameEditor, compass) {

    (function ($) {
        $(function () {
            var gameeditor = new GameEditor(compass);
            gameeditor.start();
        });
    }(jQuery));
});