/*global define, createjs */

define([
    'engine/tpl/main',
    'engine/state/main',
    'engine/lib/assets',
    'engine/savegame/load', // preloaded it, as it is triggered by a template
    'engine/savegame/save', // preloaded it, as it is triggered by a template
], function (
    gametemplate,
    gamestate,
    assets,
    loadgame,
    savegame
) {

    var games = new Array(5),
        initRun = false,

        _init = function () {
            var i;
            for (i = 0; i < games.length; i++) {
                games[i] = {
                    'slot'  : i,
                    'image' : assets.getQueueLoaded().getResult('savegameNoImage01').src,
                    'date'  : undefined,
                    'json'  : ''
                };
            }
        },

        save = function (jsonstring, slot, image, date) {
            games[slot] = {
                'json'  : jsonstring,
                'image' : image,
                'date'  : date,
                'slot'  : slot
            };
        },

        load = function (slot) {
            return games[slot];
        },

        getAll = function () {
            // let's have a lazy load here
            if (!initRun) {
                initRun = true;
                _init();
            }
            return games;
        };

    return {
        'save' : save,
        'load' : load,
        'getAll' : getAll
    };
});