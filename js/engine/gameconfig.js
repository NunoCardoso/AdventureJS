/*global define */

/**
 * this module stores configs
*/
define([
], function (
) {
    var canvasXY,
        gameWidth = 800,
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
        startButtonWidth = 200,
        startButtonY = 150,
        startButtonHeight = 60,
        buttonRounds = 10,

        _ = {
            'game.w'    : gameWidth,
            'game.h'    : gameHeight,
            'progressbar.x' : (gameWidth / 2) - (progressbarWidth / 2),
            'progressbar.y' : (gameHeight / 2),
            'progressbar.w' : progressbarWidth,
            'progressbar.h' : progressbarHeight,
            'startbutton.x' : (gameWidth / 2) - (startButtonWidth / 2),
            'startbutton.y' : startButtonY,
            'startbutton.w' : startButtonWidth,
            'startbutton.h' : startButtonHeight,
            'startbutton.r' : buttonRounds,
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

        getCanvasXY = function () {
            return canvasXY;
        },

        setCanvasXY = function (xy) {
            canvasXY = xy;
        },

        get = function (key) {
            return _[key];
        };

    return {
        'get' : get,
        'setCanvasXY' : setCanvasXY,
        'getCanvasXY' : getCanvasXY
    };
});