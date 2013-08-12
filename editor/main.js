/*global define, $ */

/**
 * This module will initialize the editor for a certain game
 */

define([
    'editor/editor',
    'games/compass/compass'
], function (GameEditor, compass) {

    var gameeditor,

        get = function () {
            return gameeditor;
        };

    $(function () {
        gameeditor = new GameEditor(compass);
        gameeditor.start();
    });

    return {
        'get' : get
    };
});