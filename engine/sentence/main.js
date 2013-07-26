/*global define */

/**
 * This module handles the console sentence
 */
define([
    'engine/sentence/sentence'
], function (
    Sentence
) {
    var _,

        get = function () {
            if (!_) {
                _ = new Sentence();
            }
            return _;
        },

        setText = function (text) {
            _.text = text;
        },

        getText = function () {
            return _.text;
        },

        hide = function () {
            _.text = "";
        };

    return {
        'get' : get,
        'setText' : setText,
        'getText' : getText,
        'hide' : hide
    };
});
