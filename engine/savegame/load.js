/*global define, $, document, createjs */

define([
    'engine/state/main',
    'engine/game/music'
], function (
    gamestate,
    gamemusic
) {
    var loadOk = function (button) {
            var tr = $(button).closest(".savegame");
            var slot = parseInt(tr.find(".slot").html(), 10);
            var loadgame = require('engine/savegame/main').load(slot);
            if (loadgame.json) {
                require('engine/tpl/main').close();
                gamestate.setFromJSON(loadgame.json);
                var gamestage = require('engine/stage/main');
                gamemusic.playMusic(gamestage.get().getCurrentScene().music);
                gamestage.play();
            }
        },

        loadCancel = function (button) {
            var info = $(button).closest('.savegame');
            var date = info.find('span.date');
            var buttons = info.find('span.buttons');
            buttons.html('');
            date.html(date.data('old-date'));
        },

        onImageClick = function (link) {
            $('span.buttons').html('');
            var tr = $(link).closest('.savegame');
            var info = tr.find(".info");
            var date = info.find('span.date');
            var buttons = info.find('span.buttons');

            var button_html = "<br><button class='okbutton' onClick=\"require('engine/savegame/load').loadOk(this);return false;\">OK</button>";
            button_html += "<br><button class='cancelbutton' onClick=\"require('engine/savegame/load').loadCancel(this);return false;\">Cancel</button>";
            // backup date html

            buttons.html(button_html);
            var gamestage = require('engine/stage/main');
            gamestage.update();
        };

    return {
        'onImageClick' : onImageClick,
        'loadOk'       : loadOk,
        'loadCancel'   : loadCancel
    };
});
