/*global define */

/**
 * This module is a game object class
 */
define([
], function (
) {
    var GameDialog = function (options) {
        this.name = 'dialog.' + options.id;
        this.to    = options.to;
        this.lines = options.lines;
        this.onEnd = options.onEnd;
    };

    return GameDialog;
});
