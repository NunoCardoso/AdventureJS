/*global define */

/**
 * this module stores configs
*/
define([
], function (
) {
    var gameWidth = 800,
        gameHeight = 400,
        consoleWidth = gameWidth,
        consoleHeight = 200,
        actionHeight  = 20,
        verbWidth = 400,
        verbHeight = consoleHeight - actionHeight,
        verbColumns = 3,
        verbRows = 4,

        _ = {
            'console.x' : 0,
            'console.y' : gameHeight,
            'console.w' : gameWidth,
            'console.h' : consoleHeight,
            'console.action.y' : gameHeight,
            'console.verbs.x' : 0,
            'console.verbs.y' : gameHeight + consoleHeight,
            'console.verbs.columns' : verbColumns,
            'console.verbs.rows' : verbRows,
            'console.verbs.incrementX' : parseInt(verbWidth / verbColumns, 10),
            'console.verbs.incrementY' : parseInt(verbHeight / verbRows, 10)
        },

        get = function (key) {
            return _[key];
        };

    return {
        'get' : get
    };
});