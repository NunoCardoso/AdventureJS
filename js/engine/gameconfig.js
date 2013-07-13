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
        sentenceHeight  = 20,
        verbWidth = 400,
        verbHeight = consoleHeight - sentenceHeight,
        verbColumns = 3,
        verbRows = 3,

        _ = {
            'game.w'    : gameWidth,
            'game.h'    : gameHeight + consoleHeight,
            'console.x' : 0,
            'console.y' : gameHeight,
            'console.w' : gameWidth,
            'console.h' : consoleHeight,
            'console.action.y' : gameHeight,
            'console.verbs.x' : 0,
            'console.verbs.y' : gameHeight + sentenceHeight,
            'console.sentence.defaultText' : 'Look at',
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