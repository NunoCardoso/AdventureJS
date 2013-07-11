/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'advgame/gameconfig',
    'advgame/images',
    'advgame/gamestage'
], function (
    gameconfig,
    images,
    gamestage
) {
    var _,

        _prepare = function (oconsole) {

            _ = {};

            // black background
            _.background = new createjs.Shape();
            _.background.name = "_Background";
            _.background.graphics.beginFill("black")
                .drawRoundRect(
                    gameconfig.get('console.x'),
                    gameconfig.get('console.y'),
                    gameconfig.get('console.w'),
                    gameconfig.get('console.h'),
                0);

            // action
            _.action = new createjs.Text(gameconfig.get('console.action.defaultText'), "16px the8bit", "#FFFFFF");
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
        },

        get = function () {
            return _;
        },

		_onVerbMouseOver = function (e) {
			console.log("verb mouse over");
			// e.target is the verb
			e.target.alpha = 1;
		},

		_onVerbMouseOut = function (e) {
			console.log("verb mouse out");
			// e.target is the verb
			e.target.alpha = 0.7;
		},

		_onVerbClick = function (e) {
			console.log("verb click");
			_.action.text = e.target.name;
		},

		render = function (oconsole) {
            var i,
                container = new createjs.Container();

            _prepare(oconsole);

            container.addChild(
                _.background,
                _.action
            );

            for (i = 0; i < _.verbs.length; i++) {
				container.addChild(
                    _.verbs[i]
                );
                _.verbs[i].addEventListener('mouseover', $.proxy(_onVerbMouseOver, this));
                _.verbs[i].addEventListener('mouseout', $.proxy(_onVerbMouseOut, this));
                _.verbs[i].addEventListener('click', $.proxy(_onVerbClick, this));
			}
            gamestage.addChild(container);
		};

    return {
        'render' : render,
        'get'   : get
    };
});