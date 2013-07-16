/*global define */

/**
 * This module handles the console sentence
 */
define([
    'engine/sentence/sentence'
], function (
    Sentence
) {

    var s,

        get = function () {
            if (!s) {
                s = new Sentence();
            }
            return s;
        },

        setText = function (text) {
            s.setText(text);
        },

        getText = function () {
            return s.getText();
        };

    return {
        'get' : get,
        'setText' : setText,
        'getText' : getText
    };
});
