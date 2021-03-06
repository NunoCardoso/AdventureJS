/*global define, createjs, customer_url */

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
            var game = require('engine/main').getGame();
            if (game.getSource() === "DB game") {
                var url = customer_url;
                $.ajax({
                    url: url + '/app/advgames/' + game.getId() + '/achievements',
                    method: 'PUT',
                    data: {'achievement' : achievement},
                    success: function (response) {
                        require('engine/game/music').playSound('sound.fall');
                        _[achievement].publish();
                    }
                });
            } else {
                require('engine/game/music').playSound('sound.fall');
                _[achievement].publish();
            }
        };

    return {
        'preload' : preload,
        'get'     : get,
        'publish' : publish
    };
});