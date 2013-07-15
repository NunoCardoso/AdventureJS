/*global define */

/**
 * This module instantiates the stage singleton
 */
define([
    'engine/stage/stage'
], function (
    GameStage
) {

    var stage,

        preload = function (character) {
            stage = new GameStage();
        },

        getInstance = function () {
            return stage;
        };

    return {
        'preload'      : preload,
        'getInstance'  : getInstance
    };
});
