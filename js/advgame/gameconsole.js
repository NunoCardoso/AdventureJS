/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'advgame/gameprops',
    'advgame/gamestage',
], function (gameprops, gamestage) {

    var gameconsole,
        x = 0,
        y = 400,
        w = 800,
        h = 200,

        prepare = function () {

            gameconsole = {};

            // start button
            gameconsole.background = new createjs.Shape();
            gameconsole.background.name = "gameconsoleBackground";
            gameconsole.background.graphics.beginFill("black")
                .drawRoundRect(x, y, w, h, 0);

            gameprops.set('gameconsole', gameconsole);
        },

        render = function () {
            var gameconsoleContainer = new createjs.Container(),
                verbContainer = new createjs.Container(),
                arrowContainer = new createjs.Container(),
                inventoryContainer = new createjs.Container();

            gameconsole = gameprops.get('gameconsole');

            gameconsoleContainer.addChild(
                gameconsole.background
            );

            gamestage.addChild(gameconsoleContainer);
		};

    return {
        'prepare' : prepare,
        'render' : render
    };
});