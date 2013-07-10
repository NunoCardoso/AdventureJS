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

            // black background
            gameconsole.background = new createjs.Shape();
            gameconsole.background.name = "gameconsoleBackground";
            gameconsole.background.graphics.beginFill("black")
                .drawRoundRect(x, y, w, h, 0);

            // action
            gameconsole.action = new createjs.Text("", "16px the8bit", "#FFFFFF");
            gameconsole.action.textAlign = "center";
            gameconsole.action.textBaseline = "top";
            gameconsole.action.x = gamestage.getCanvasXY().x / 2;
            gameconsole.action.y = 401;

            gameprops.set('gameconsole', gameconsole);
        },

        render = function () {
            var gameconsoleContainer = new createjs.Container(),
                actionContainer = new createjs.Container(),
                verbContainer = new createjs.Container(),
                arrowContainer = new createjs.Container(),
                inventoryContainer = new createjs.Container();

            gameconsole = gameprops.get('gameconsole');

            gameconsoleContainer.addChild(
                gameconsole.background
            );
            actionContainer.addChild(
                gameconsole.action
            );

            gamestage.addChild(gameconsoleContainer);
            gamestage.addChild(actionContainer);
		},

		onCharacterMouseOver = function (e) {
			console.log("character mouse over");
			gameconsole.action.text = 'Look at ' + e.target.name;
		},

		onCharacterMouseOut = function (e) {
			console.log("character mouse out");
			gameconsole.action.text = '';
		};
    return {
        'prepare' : prepare,
        'render' : render,
        'onCharacterMouseOver' : onCharacterMouseOver,
        'onCharacterMouseOut' : onCharacterMouseOut
    };
});