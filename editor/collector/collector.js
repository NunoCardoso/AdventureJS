/*global define, createjs, $ */

/**
 * This module handles dialogs
 */
define([
    'editor/collector/panel/startingInventory',
    'editor/collector/panel/verbs',
    'editor/collector/images',
    'editor/collector/sounds',
    'editor/collector/npcs',
    'editor/collector/maindata'
], function (
    startingInventory,
    verbs,
    images,
    sounds,
    npcs,
    mainData
) {

    var getGame = function () {
        var panel = {},
            game = {};

        panel.verbs = verbs.getVerbs();
        panel.startingInventory = startingInventory.getStartingInventory();

        game.images = images.getImages();

        game.sounds = sounds.getSounds();

        game.pc = [];

        game.npcs = npcs.getNpcs();

        game.panel = panel;

        game.main = mainData.getMainData();

        return game;
        },
        setGame = function () {
        };
    return {
        'getGame' : getGame,
        'setGame' : setGame
    };
});
