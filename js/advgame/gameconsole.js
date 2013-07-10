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

        prepare = function (oconsole) {

            gameconsole = {};

            // black background
            gameconsole.background = new createjs.Shape();
            gameconsole.background.name = "gameconsoleBackground";
            gameconsole.background.graphics.beginFill("black").drawRoundRect(x, y, w, h, 0);

            // action
            gameconsole.action = new createjs.Text("", "16px the8bit", "#FFFFFF");
            gameconsole.action.textAlign = "center";
            gameconsole.action.textBaseline = "top";
            gameconsole.action.x = gamestage.getCanvasXY().x / 2;
            gameconsole.action.y = 401;

            // verbs
            gameconsole.verbs = [];
            var i,
                initialX = 0,
                initialY = 420,
                incrementX = 133,
                incrementY = 40,
                maxColumns = 3;

            for (i = 0; i < oconsole.verbs.length; i++) {
                var verb = oconsole.verbs[i];
                gameconsole.verbs[i] = new createjs.Text(verb.first, "22px the8bit", "#FFFFFF");

                gameconsole.verbs[i].textAlign = "left";
                gameconsole.verbs[i].textBaseline = "middle";
                gameconsole.verbs[i].alpha = 0.7;
                var rowNumber = parseInt(i / maxColumns, 10);
                var colNumber = i % maxColumns;

                var positionX = initialX + colNumber * incrementX;
                var positionXwithMargin = positionX + 10;
                var positionY = initialY + rowNumber * incrementY;
                var positionYonMiddle = positionY + (incrementY / 2); // align middle
                gameconsole.verbs[i].x = positionXwithMargin;
                gameconsole.verbs[i].y = positionYonMiddle;

                // hovering on text sucks. Let's add a flat hit area!
                var hitArea = new createjs.Shape();
                hitArea.graphics.beginFill("red")
                    .drawRect(-10, -30, incrementX, incrementY);

				gameconsole.verbs[i].hitArea = hitArea;
            }
            gameprops.set('gameconsole', gameconsole);
        },

		onCharacterMouseOver = function (e) {
			console.log("character mouse over");
			gameconsole.action.text = 'Look at ' + e.target.name;
		},

		onCharacterMouseOut = function (e) {
			console.log("character mouse out");
			gameconsole.action.text = '';
		},

		onVerbMouseOver = function (e) {
			console.log("verb mouse over");
			// e.target is the verb
			e.target.alpha = 1;
		},

		onVerbMouseOut = function (e) {
			console.log("verb mouse out");
			// e.target is the verb
			e.target.alpha = 0.7;
		},

		onVerbClick = function (e) {
			console.log("verb click");
			gameconsole.action.text = e.target.name;
		},

		render = function () {
            var i,
                gameconsoleContainer = new createjs.Container(),
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

            for (i = 0; i < gameconsole.verbs.length; i++) {
				verbContainer.addChild(
                    gameconsole.verbs[i]
                );
                gameconsole.verbs[i].addEventListener('mouseover', $.proxy(onVerbMouseOver, this));
                gameconsole.verbs[i].addEventListener('mouseout', $.proxy(onVerbMouseOut, this));
                gameconsole.verbs[i].addEventListener('click', $.proxy(onVerbClick, this));
			}
            gamestage.addChild(gameconsoleContainer);
            gamestage.addChild(actionContainer);
            gamestage.addChild(verbContainer);
		};

    return {
        'prepare' : prepare,
        'render' : render,
        'onCharacterMouseOver' : onCharacterMouseOver,
        'onCharacterMouseOut' : onCharacterMouseOut
    };
});