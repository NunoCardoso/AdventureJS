/*global define */

/**
 * this module stores configs for default texts, dimensions, etc
*/
define([
], function (
) {
    var canvasXY,
        gameWidth = 800,
        gameHeight = 400,
        panelWidth = gameWidth,
        panelHeight = 200,
        sentenceHeight  = 20,
        verbWidth = 400,
        verbHeight = panelHeight - sentenceHeight,
        verbColumns = 3,
        verbRows = 3,
        progressbarWidth = 200,
        progressbarHeight = 20,

        buttonWidth = 200,
        buttonY = 150,
        buttonHeight = 60,
        buttonRounds = 10,

        _ = {
            'panel.x' : 0,
            'panel.y' : gameHeight,
            'panel.w' : gameWidth,
            'panel.h' : panelHeight,
            'sentence.y' : gameHeight,
            'sentence.defaultText' : 'Walk to',
            'panel.verbs.x' : 0,
            'panel.verbs.y' : gameHeight + sentenceHeight,
            'panel.verbs.columns' : verbColumns,
            'panel.verbs.rows' : verbRows,
            'panel.verbs.incrementX' : parseInt(verbWidth / verbColumns, 10),
            'panel.verbs.incrementY' : parseInt(verbHeight / verbRows, 10),
            'game.w'    : gameWidth,
            'game.h'    : gameHeight,
            'loadedfile.y' : (gameHeight / 2) + 30,
            'loading' : 'Loading...',
            'loading.y' : (gameHeight / 2) - 30,
            'progressbar.x' : (gameWidth / 2) - (progressbarWidth / 2),
            'progressbar.y' : (gameHeight / 2),
            'progressbar.w' : progressbarWidth,
            'progressbar.h' : progressbarHeight,
            'newgamebutton.x' : (gameWidth / 2) - buttonWidth - 5,
            'newgamebutton.y' : buttonY,
            'loadgamebutton.x' : (gameWidth / 2) + 5,
            'loadgamebutton.y' : buttonY,
            'button.w' : buttonWidth,
            'button.h' : buttonHeight,
            'button.r' : buttonRounds,
            'newgame'  : "new game!",
            'loadgame' : "load game"
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
        'get'         : get,
        'setCanvasXY' : setCanvasXY,
        'getCanvasXY' : getCanvasXY
    };
});