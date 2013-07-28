/*global define, createjs */

define([
    'engine/achievement/achievement'
], function (
    Achievement
) {

    var _  = {},
        _user,

        preload = function (achievements) {
            var i;
            for (i in achievements) {
                _[achievements[i].id] = new Achievement(achievements[i]);
            }
        },

        get = function (key) {
            return _[key];
        },

        setUser = function (user) {
            _user = user;
        },

        publish = function (achievement) {
            _[achievement].publish(_user);
        };

    return {
        'preload' : preload,
        'get'     : get,
        'publish' : publish,
        'setUser' : setUser
    };
});