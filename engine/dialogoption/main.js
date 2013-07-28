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

        params = config.get('dialogoption.params'),

        _calculateDialogOptionPosition = function (i) {
            return {
                'x' : params.initialX,
                'y' : params.initialY + i * params.incrementY
            };
        },

        addToPanel = function (dialogOptions) {
            var i,
                _do  = get(dialogOptions),
                _doc = new createjs.Container(),
                position,
                order = 0;

            for (i in _do) {
                // add only dialogs that are still valid to use
                if (_do[i].timesToUse > 0) {
                    position = _calculateDialogOptionPosition(order);
                    _do[i].x = position.x;
                    _do[i].y = position.y;
                    _doc.addChild(_do[i]);
                    order++;
                }
            }
            gamepanel.addDialogs(_doc);
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
        };

    return {
        'preload' : preload,
        'get'     : get,
        'addToPanel' : addToPanel
    };
});