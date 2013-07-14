/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/gameconfig',
    'engine/gamestage',
    'engine/console/verb',
    'engine/console/background',
    'engine/console/sentence'
], function (
    gameconfig,
    gamestage,
    Verb,
    Background,
    Sentence
) {
    var background,
        sentence,
        verbs = [],

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

            background = new Background({
                x : gameconfig.get('console.x'),
                y : gameconfig.get('console.y'),
                w : gameconfig.get('console.w'),
                h : gameconfig.get('console.h')
            });

            sentence = new Sentence();

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

                verbs[i] = new Verb({
                    text : oconsole.verbs[i].first,
                    x    : position.x,
                    y    : position.y,
                    w    : gameconfig.get('console.verbs.incrementX'),
                    h    : gameconfig.get('console.verbs.incrementY')
                });
            }
        },

		_onVerbMouseOver = function (e) {
			console.log("verb mouse over");
			// e.target is the verb
			e.target.alpha = 1;
            sentence.displayVerb(e.target);
		},

		_onVerbMouseOut = function (e) {
			console.log("verb mouse out");
			// e.target is the verb
			e.target.alpha = 0.7;
            sentence.undisplayVerb(e.target);
		},

		_onVerbClick = function (e) {
			console.log("verb click");
            createjs.Sound.play('sound.fall');
            sentence.setVerb(e.target);
		},

		load = function (oconsole) {
            _prepare(oconsole);

        },

        getSentence = function () {
            return sentence;
        },

        get = function () {
            var i,
                container = new createjs.Container();

            container.name = 'container.console';

            container.addChild(
                background,
                sentence
            );

            for (i = 0; i < verbs.length; i++) {
				container.addChild(
                    verbs[i]
                );
                verbs[i].addEventListener('mouseover', $.proxy(_onVerbMouseOver, this));
                verbs[i].addEventListener('mouseout',  $.proxy(_onVerbMouseOut, this));
                verbs[i].addEventListener('click',     $.proxy(_onVerbClick, this));
			}

            return container;
		};

    return {
        'load' : load,
        'get'  : get,
        'getSentence' : getSentence
    };
});