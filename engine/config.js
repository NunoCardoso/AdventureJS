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
        buttonY = 300,
        buttonHeight = 60,
        buttonRounds = 10,
        dialogOptionParams = {
            initialX   : 10,
            initialY   : 410,
            incrementY : 30
        },
        inventoryParams = {
            initialX   : 440,
            initialY   : 420,
            incrementX : 90,
            incrementY : 90,
            maxColumns : 4,
            marginFirstCol : 5,
            marginOtherCol : 10
        },
        inventoryX = 80,
        inventoryY = 80,

        _ = {
            'dialogoption.params' : dialogOptionParams,
            'inventory.params' : inventoryParams,

            'panel.x' : 0,
            'panel.y' : gameHeight,
            'panel.w' : gameWidth,
            'panel.h' : panelHeight,

            'inventory.x' : inventoryX,
            'inventory.y' : inventoryY,

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

            'button1of2.x' : (gameWidth / 2) - buttonWidth - 5,
            'button1of2.y' : buttonY,
            'button2of2.x' : (gameWidth / 2) + 5,
            'button2of2.y' : buttonY,
            'button1of3.x' : (gameWidth / 2) - buttonWidth -  buttonWidth / 2 - 10,
            'button1of3.y' : buttonY,
            'button2of3.x' : (gameWidth / 2) - buttonWidth / 2 + 2,
            'button2of3.y' : buttonY,
            'button3of3.x' : (gameWidth / 2) +  buttonWidth / 2 + 20,
            'button3of3.y' : buttonY,
            'button.w' : buttonWidth,
            'button.h' : buttonHeight,
            'button.r' : buttonRounds,

            'screenshot.x' : 200,
            'screenshot.y' : 150,

            'newgame'  : "New game",
            'loadgame' : "Load game",
            'savegame' : "Save game",
            'resumegame' : "Resume game",
            'settings' : "Settings"

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