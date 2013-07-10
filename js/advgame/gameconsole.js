/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'advgame/gameprops',
    'advgame/gamestage',
], function (gameprops, gamestage) {

    var _,
        x = 0,
        y = 400,
        w = 800,
        h = 200,

        prepare = function (oconsole) {

            _ = {};

            // black background
            _.background = new createjs.Shape();
            _.background.name = "_Background";
            _.background.graphics.beginFill("black").drawRoundRect(x, y, w, h, 0);

            // action
            _.action = new createjs.Text("", "16px the8bit", "#FFFFFF");
            _.action.textAlign = "center";
            _.action.textBaseline = "top";
            _.action.x = gamestage.getCanvasXY().x / 2;
            _.action.y = 401;

            // verbs
            _.verbs = [];
            var i,
                initialX = 0,
                initialY = 420,
                incrementX = 133,
                incrementY = 40,
                maxColumns = 3;

            for (i = 0; i < oconsole.verbs.length; i++) {
                var verb = oconsole.verbs[i];
                _.verbs[i] = new createjs.Text(verb.first, "22px the8bit", "#FFFFFF");

                _.verbs[i].textAlign = "left";
                _.verbs[i].textBaseline = "middle";
                _.verbs[i].alpha = 0.7;
                var rowNumber = parseInt(i / maxColumns, 10);
                var colNumber = i % maxColumns;

                var positionX = initialX + colNumber * incrementX;
                var positionXwithMargin = positionX + 10;
                var positionY = initialY + rowNumber * incrementY;
                var positionYonMiddle = positionY + (incrementY / 2); // align middle
                _.verbs[i].x = positionXwithMargin;
                _.verbs[i].y = positionYonMiddle;

                // hovering on text sucks. Let's add a flat hit area!
                var hitArea = new createjs.Shape();
                hitArea.graphics.beginFill("red")
                    .drawRect(-10, -30, incrementX, incrementY);

				_.verbs[i].hitArea = hitArea;
            }
            gameprops.set('_', _);
        },

		onCharacterMouseOver = function (e) {
			console.log("character mouse over");
			_.action.text = 'Look at ' + e.target.name;
		},

		onCharacterMouseOut = function (e) {
			console.log("character mouse out");
			_.action.text = '';
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
			_.action.text = e.target.name;
		},

		render = function () {
            var i,
                _Container = new createjs.Container(),
                actionContainer = new createjs.Container(),
                verbContainer = new createjs.Container(),
                arrowContainer = new createjs.Container(),
                inventoryContainer = new createjs.Container();

            _ = gameprops.get('_');

            _Container.addChild(
                _.background
            );
            actionContainer.addChild(
                _.action
            );

            for (i = 0; i < _.verbs.length; i++) {
				verbContainer.addChild(
                    _.verbs[i]
                );
                _.verbs[i].addEventListener('mouseover', $.proxy(onVerbMouseOver, this));
                _.verbs[i].addEventListener('mouseout', $.proxy(onVerbMouseOut, this));
                _.verbs[i].addEventListener('click', $.proxy(onVerbClick, this));
			}
            gamestage.addChild(_Container);
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