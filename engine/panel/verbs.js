/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/panel/verb',
    'engine/config'
], function (
    Verb,
    config
) {
    var verbs,

        verbParams = {
            initialX   : config.get('panel.verbs.x'),
            initialY   : config.get('panel.verbs.y'),
            incrementX : config.get('panel.verbs.incrementX'),
            incrementY : config.get('panel.verbs.incrementY'),
            maxColumns : config.get('panel.verbs.columns')
        },

        _calculateVerbPosition = function (i) {

            var rowNumber = parseInt(i / verbParams.maxColumns, 10),
                colNumber = i % verbParams.maxColumns,
                positionX = verbParams.initialX + colNumber * verbParams.incrementX,
                positionY = verbParams.initialY + rowNumber * verbParams.incrementY;

            return {
                'x' : positionX,
                'y' : positionY
            };
        },

        init = function (verbs) {
            var i;

            for (i = 0; i < verbs.length; i++) {
                var position = _calculateVerbPosition(i);

                verbs[i] = new Verb({
                    text : verbs[i].first,
                    x    : position.x,
                    y    : position.y,
                    w    : config.get('panel.verbs.incrementX'),
                    h    : config.get('panel.verbs.incrementY'),
                    nr   : verbs[i].nr,
                    second : verbs[i].second
                });
            }

            return verbs;
        };

    return {
        'init' : init
    };
});
