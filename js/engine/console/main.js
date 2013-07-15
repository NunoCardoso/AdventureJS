/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/config',
    'engine/console/verb',
    'engine/console/background',
    'engine/console/sentence'
], function (
    config,
    action,
    Verb,
    Background,
    Sentence
) {
    var background,
        sentence,
        verbs = [],
        container,

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

        preload = function (options) {

            background = new Background();

            sentence = new Sentence();

            var i,
                verbParams = {
                    initialX   : 0,
                    initialY   : config.get('console.verbs.y'),
                    incrementX : config.get('console.verbs.incrementX'),
                    incrementY : config.get('console.verbs.incrementY'),
                    maxColumns : config.get('console.verbs.columns')
                };

            for (i = 0; i < options.verbs.length; i++) {
                var position = _calculateVerbPosition(i, verbParams);

                verbs[i] = new Verb({
                    text : options.verbs[i].first,
                    x    : position.x,
                    y    : position.y,
                    w    : config.get('console.verbs.incrementX'),
                    h    : config.get('console.verbs.incrementY'),
                    nr   : options.verbs[i].nr,
                    second : options.verbs[i].second
                });
            }
        },

        getSentence = function () {
            return sentence;
        },

        get = function () {
            if (typeof container !== 'undefined') {
                return container;
            }
            var i;
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
			}

            return container;
		};

    return {
        'preload'     : preload,
        'get'         : get,
        'getSentence' : getSentence
    };
});