/*global define */

/**
 * This module handles interactions
 */
define([
], function (
) {

    var decide = function () {
        
        _decideAction = function () {
            // ok, action is going to be performed , let's reset the sentence
            var textToSay = _getDefaultText();

            selectedVerb = false;
            selectedVerbSecond = false;
            selectedObject = false;

            _pushText(textToSay);

            return {
                'action' : 'say',
                'text'   : textToSay
            };
        },
    }

    return {
        'decide' : decide
    };
});
