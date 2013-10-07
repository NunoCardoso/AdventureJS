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
        verbWidth = 350,
        verbHeight = panelHeight - sentenceHeight - 20,
        verbColumns = 3,
        verbRows = 3,
        progressbarWidth = 200,
        progressbarHeight = 20,

        buttonWidth = 200,
        buttonY = 450,
        buttonHeight = 60,
        buttonRounds = 10,

        dialogOptionParams = {
            initialX   : 40,
            initialY   : 410,
            incrementY : 40,
            maxRows    : 5
        },
        inventoryParams = {
            initialX   : 402,
            initialY   : 430,
            incrementX : 80,
            incrementY : 85,
            maxRows    : 2,
            maxColumns : 5
        },
        inventoryX = 80,
        inventoryY = 80,

        _ = {
            'achievement.unlocked' : "Achievement unlocked",
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

            'panel.verbs.x' : 55,
            'panel.verbs.y' : gameHeight + sentenceHeight + 18,
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