/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/dialog/option',
    'engine/config'
], function (
    GameDialogOption,
    config
) {
    var dialogOptions = [],
        params        = config.get('dialogoption.params'),

        _calculateDialogOptionPosition = function (i) {
            return {
                'x' : params.initialX,
                'y' : params.initialY + i * params.incrementY
            };
        },

        init = function (options) {
            var i;

            for (i in options.dialogOptions) {
                var position = _calculateDialogOptionPosition(i);

                dialogOptions[i] = new GameDialogOption({
                    text   : options.dialogOptions[i].text,
                    dialog : options.dialogOptions[i].dialog,
                    x      : position.x,
                    y      : position.y,
                    pc     : options.pc,
                    npc    : options.npc
                });
            }
            return dialogOptions;
        };

    return {
        'init' : init
    };
});
