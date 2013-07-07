/*global define */

define([], function () {
    var _ = {},

        init = function () {
            _ = {};
        },

        get = function (key) {
            if (typeof (key) === 'undefined') {
                return _;
            }
            return _[key];
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