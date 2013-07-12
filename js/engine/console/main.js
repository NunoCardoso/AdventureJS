/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/gameconfig',
    'engine/images',
    'engine/gamestage',
    'engine/console/verb',
    'engine/console/background',
    'engine/console/sentence',
    'engine/sounds'
], function (
    gameconfig,
    images,
    gamestage,
    Verb,
    Background,
    Sentence,
    sounds
) {
    var _,

        _calculateVerbPosition = function (i, params) {

            var rowNumber = parseInt(i / params.maxColumns, 10),
                colNumber = i % params.maxColumns,
                positionX = params.initialX + colNumber * params.incrementX,
                positionXwithMargin = positionX + 10,
                positionY = params.initialY + rowNumber * params.incrementY,
                positionYonMiddle = positionY + (params.incrementY / 2); // align middle

            return {
                'x' : positionXwithMargin,
                'y' : positionYonMiddle
            };
        },

        _prepare = function (oconsole) {

            _ = {};

            _.background = new Background({
                x : gameconfig.get('console.x'),
                y : gameconfig.get('console.y'),
                w : gameconfig.get('console.w'),
                h : gameconfig.get('console.h')
            });

            _.sentence = new Sentence(
                gameconfig.get('console.sentence.defaultText'),
                {
                    x : gameconfig.get('console.w') / 2,
                    y : gameconfig.get('console.y')
                }
            );

            _.verbs = [];

            var i,
                verbParams = {
                    initialX   : 0,
                    initialY   : gameconfig.get('console.verbs.y'),
                    incrementX : gameconfig.get('console.verbs.incrementX'),
                    incrementY : gameconfig.get('console.verbs.incrementY'),
                    maxColumns : gameconfig.get('console.verbs.columns')
                };

            for (i = 0; i < oconsole.verbs.length; i++) {
                var position = _calculateVerbPosition(i, verbParams);

                _.verbs[i] = new Verb({
                    text : oconsole.verbs[i].first,
                    x    : position.x,
                    y    : position.y,
                    w    : gameconfig.get('console.verbs.incrementX'),
                    h    : gameconfig.get('console.verbs.incrementY')
                });
            }
        },

        get = function () {
            return _;
        },

		_onVerbMouseOver = function (e) {
			console.log("verb mouse over");
			// e.target is the verb
			e.target.alpha = 1;
            _.sentence.text = e.target.text;
		},

		_onVerbMouseOut = function (e) {
			console.log("verb mouse out");
			// e.target is the verb
			e.target.alpha = 0.7;
            if (_.sentence.lockedVerb) {
                _.sentence.text = _.sentence.lockedVerb.text;
            } else {
                _.sentence.text = gameconfig.get('console.verbs.defaultText');
            }
		},

		_onVerbClick = function (e) {
			console.log("verb click");
            sounds.play('sound.fall');
            _.sentence.lockedVerb = e.target;
			_.sentence.text = e.target.text;
		},

		render = function (oconsole) {
            var i,
                container = new createjs.Container();

            container.name = 'container.console';
            _prepare(oconsole);

            container.addChild(
                _.background,
                _.sentence
            );

            for (i = 0; i < _.verbs.length; i++) {
				container.addChild(
                    _.verbs[i]
                );
                _.verbs[i].addEventListener('mouseover', $.proxy(_onVerbMouseOver, this));
                _.verbs[i].addEventListener('mouseout',  $.proxy(_onVerbMouseOut, this));
                _.verbs[i].addEventListener('click',     $.proxy(_onVerbClick, this));
			}

            gamestage.addChild(container);
		};

    return {
        'render' : render,
        'get'   : get
    };
});