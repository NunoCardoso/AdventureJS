/*global define, createjs */

define([
    'engine/achievement/achievement'
], function (
    Achievement
) {

    var _  = {},

        preload = function (achievements) {
            var i;
            for (i in achievements) {
                _[achievements[i].id] = new Achievement(achievements[i]);
            }
        },

        get = function (key) {
            return _[key];
        },

        publish = function (achievement) {
            _[achievement].publish();
        };

    return {
        'preload' : preload,
        'get'     : get,
        'publish' : publish
    };
});