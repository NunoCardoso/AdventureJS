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

        optionParams = {
            initialX   : 10,
            initialY   : 410,
            incrementY : 30
        },

        _calculateDialogOptionPosition = function (i) {

            var positionY = optionParams.initialY + i * optionParams.incrementY;

            return {
                'x' : optionParams.initialX,
                'y' : positionY
            };
        },

        init = function (options) {
            var i;

            for (i = 0; i < options.dialogOptions.length; i++) {
                var position = _calculateDialogOptionPosition(i);

                dialogOptions[i] = new GameDialogOption({
                    text : options.dialogOptions[i].line,
                    dialog : options.dialogOptions[i].dialog,
                    x   : position.x,
                    y   : position.y,
                    pc  : options.pc,
                    npc : options.npc
                });
            }

            //_dialogOptions[i].dialog
            return dialogOptions;
        };

    return {
        'init' : init,
    };
});
