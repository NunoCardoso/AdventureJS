/*global define, createjs */

define([
    'engine/dialogoption/dialogoption'
], function (
    DialogOption
) {

    var _      = {},

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
                        text   : choices[i].text,
                        dialog : choices[i].dialog,
                        timesToUse : timesToUse
                    });
                }
                _[id] = processedChoices;
            }
        },

        get = function (key) {
            return _[key];
        };

    return {
        'preload' : preload,
        'get'     : get
    };
});