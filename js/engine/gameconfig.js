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
        progressbarWidth = 200,
        progressbarHeight = 20,

        _ = {
            'game.w'    : gameWidth,
            'game.h'    : gameHeight + consoleHeight,
            'progressbar.x' : (gameWidth / 2) - (progressbarWidth / 2),
            'progressbar.y' : (gameHeight / 2),
            'progressbar.w' : progressbarWidth,
            'progressbar.h' : progressbarHeight,
            'loading' : 'Loading...',
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