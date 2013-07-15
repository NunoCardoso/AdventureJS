/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/config',
    'engine/panel/verb',
    'engine/panel/background',
    'engine/panel/sentence'
], function (
    config,
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
                    initialY   : config.get('panel.verbs.y'),
                    incrementX : config.get('panel.verbs.incrementX'),
                    incrementY : config.get('panel.verbs.incrementY'),
                    maxColumns : config.get('panel.verbs.columns')
                };

            for (i = 0; i < options.verbs.length; i++) {
                var position = _calculateVerbPosition(i, verbParams);

                verbs[i] = new Verb({
                    text : options.verbs[i].first,
                    x    : position.x,
                    y    : position.y,
                    w    : config.get('panel.verbs.incrementX'),
                    h    : config.get('panel.verbs.incrementY'),
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

            container.name = 'container.panel';

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