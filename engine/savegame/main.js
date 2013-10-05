/*global define, createjs, alert */

define([
    'engine/lib/assets',
    'engine/savegame/load', // preloaded it, as it is triggered by a template
    'engine/savegame/save'  // preloaded it, as it is triggered by a template
], function (
    assets,
    loadgame,
    savegame
) {

    var _games   = new Array(5),
        _initRun = false,

        _init = function () {
            var i;
            // it has to be a for loop without the in.
            for (i = 0; i < _games.length; i++) {
                _games[i] = {
                    'slot'  : i,
                    'image' : assets.getQueueLoaded().getResult('image.savegame.noimage').src,
                    'date'  : undefined,
                    'json'  : ''
                };
            }
        },

        save = function (jsonstring, slot, image, date) {
            _games[slot] = {
                'json'  : jsonstring,
                'image' : image,
                'date'  : date,
                'slot'  : slot
            };

            var game = require('engine/main').getGame();

            // If game was loaded from DB... save savegame there
            if (game.getSource() === "DB game") {
                $.ajax({
                    'method' : 'POST',
                    'url' : '/adventure-games-hand-ins/app/advgames/' + game.getId() + '/savegames/' + slot,
                    'data' : {
                        'json' : jsonstring,
                        'image' : image,
                        'slotId' : slot
                    },
                    success: function (response) {
                        if (response) {
                            alert('Saved savegame into DB');
                        } else {
                            alert('Saved savegame into DB FAILED');
                        }
                    }
                });
            }
        },

        load = function (slot) {
            var game = require('engine/main').getGame();

            // If game was loaded from DB... save savegame there
            if (game.getSource() === "DB game") {
                $.ajax({
                    'method' : 'GET',
                    'url' : '/adventure-games-hand-ins/app/advgames/' + game.getId() + '/savegames/' + slot,
                    success: function (response) {
                        if (response) {
                            alert('got savegame from DB');
                        } else {
                            alert('got savegame from DB FAILED');
                        }
                    }
                });
            } else {
                return _games[slot];
            }
        },

        getAll = function () {
            // let's have a lazy load here
            if (!_initRun) {
                _initRun = true;
                _init();
            }
            return _games;
        };

    return {
        'save'   : save,
        'load'   : load,
        'getAll' : getAll
    };
});