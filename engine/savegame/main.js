/*global define, top, createjs, alert, customer_url */

define([
    'engine/lib/assets',
    'engine/savegame/load', // preloaded it, as it is triggered by a template
    'engine/savegame/save'  // preloaded it, as it is triggered by a template
], function (
    assets,
    loadgame,
    savegame
) {

    var _games   = new Array(9),
        _initRun = false,

        _emptySlot = function (i) {
            return {
                'slot'  : i,
                'image' : assets.getQueueLoaded().getResult('image.savegame.noimage').src,
                'date'  : undefined,
                'json'  : undefined
            };
        },

        _filledSpot = function (savegame, i) {
            return {
                'slot'  : i,
                'image' : savegame.image,
                'date'  : savegame.saved_at,
                'json'  : JSON.parse(savegame.json)
            };
        },

        _init = function (savegamesFromDB) {
            var i, j;
            // it has to be a for loop without the in.
            for (i = 0; i < _games.length; i++) {
                var processed = false;
                if (savegamesFromDB) {
                    for (j = 0; j < savegamesFromDB.length; j++) {
                        if (savegamesFromDB[j].slot_id === i) {
                            processed = true;
                            _games[i] = _filledSpot(savegamesFromDB[j], i);
                        }
                    }
                }
                if (!processed) {
                    _games[i] = _emptySlot(i);
                }
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
                var url = customer_url;
                $.ajax({
                    'method' : 'PUT',
                    'url'    : url + '/app/advgames/' + game.getId() + '/savegames/' + slot,
                    'data'   : {
                        'json'   : jsonstring,
                        'image'  : image,
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
            // getAll already loaded and cached everything...
            return _games[slot];
        },

        getAll = function () {
            // let's have a lazy load here
            var d = $.Deferred();

            if (!_initRun) {
                _initRun = true;
                var game = require('engine/main').getGame();
                if (game.getSource() === "DB game") {
                    var url = customer_url;
                    $.ajax({
                        'method' : 'GET',
                        'url'    : url + '/app/advgames/' + game.getId() + '/savegames/',
                        success  : function (response) {
                            _init(response);
                            d.resolve(_games);
                        }
                    });
                } else {
                    _init(null);
                    d.resolve(_games);
                }
            } else {
                return _games;
            }
            return d.promise();
        };

    return {
        'save'   : save,
        'load'   : load,
        'getAll' : getAll
    };
});
