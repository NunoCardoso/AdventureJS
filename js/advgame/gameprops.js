/*global define */

/**
 * this module stores game properties, serves it into other modules.
*/
define([
], function (
) {
    var _,

        init = function () {
            _ = {};
        },

        get = function (key) {
            return ((typeof (key) !== 'undefined') ? _[key] : _);
        },

        set = function (key, value) {
            _[key] = value;
        };

    return {
        'init' : init,
        'get' : get,
        'set' : set
    };
});