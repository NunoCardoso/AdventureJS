/*global define, createjs */

define([
    'engine/config',
    'engine/dialogoption/dialogoption',
    'engine/panel/main'
], function (
    config,
    DialogOption,
    gamepanel
) {

    var _      = {},

        get = function (key) {
            return _[key];
        },

        _calculatePersistence = function (persistence) {
            if (persistence === 'once') {
                return 1;
            }
            if (persistence === 'always') {
                return 10000;
            }
        },

        preload = function (options) {
            var i, id, choices, processedChoices;
            for (i in options) {
                id = options[i].id;
                choices = options[i].choices;
                processedChoices = [];

                for (i in choices) {
                    var timesToUse = _calculatePersistence(choices[i].persistence);

                    processedChoices[i] = new DialogOption({
                        id     : 'dialogoption.' + i,
                        text   : choices[i].text,
                        dialog : choices[i].dialog,
                        timesToUse : timesToUse,
                        position : i
                    });
                }
                _[id] = processedChoices;
            }
        };

    return {
        'preload' : preload,
        'get'     : get
    };
});