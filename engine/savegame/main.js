/*global define, createjs */

define([
    'engine/lib/assets',
    'engine/savegame/load', // preloaded it, as it is triggered by a template
    'engine/savegame/save', // preloaded it, as it is triggered by a template
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
        },

        load = function (slot) {
            return _games[slot];
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