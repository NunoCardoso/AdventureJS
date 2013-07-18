/*global define */

/**
 * This module is a game object class
 */
define([
], function (
) {
    var GameDialog = function (options) {
        this.name = 'dialog.' + options.id;
        this.lines = options.lines;
    };

    return GameDialog;
});
