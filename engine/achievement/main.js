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
            var game = require('engine/main').getGame();
            if (game.getSource() === "DB game") {
                $.ajax({
                    url: '/adventure-games-hand-ins/app/advgames/' + game.getId() + '/achievements',
                    method: 'PUT',
                    data: {'achievement' : achievement},
                    success: function (response) {
                    }
                });
            }
            _[achievement].publish(_user);
        };

    return {
        'preload' : preload,
        'get'     : get,
        'publish' : publish,
        'setUser' : setUser
    };
});