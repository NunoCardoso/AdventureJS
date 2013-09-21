/*global define, $, document, createjs */

define([
    'engine/stage/main',
    'engine/state/main'
], function (
    gamestage,
    gamestate
) {
    var loadOk = function (button) {
            var tr = $(button).closest("tr");
            var slot = parseInt(tr.find("td.slot").html(), 10);
            var loadgame = require('engine/savegame/main').load(slot);
            require('engine/tpl/main').close();

            gamestage.play();
            gamestate.setFromJSON(loadgame.json);
        },

        loadCancel = function (button) {
            var date = $(button).closest('td');
            date.html(date.data('old-date'));
        },

        onImageClick = function (link) {

            var tr = $(link).closest('tr');
            var table = $(link).closest('table');
            var date = tr.find("td.date");

            var button_html = "<br><button class='okbutton' onClick=\"require('engine/savegame/load').loadOk(this);return false;\">OK</button>";
            button_html += "<br><button class='cancelbutton' onClick=\"require('engine/savegame/load').loadCancel(this);return false;\">Cancel</button>";
            // backup date html
            date.data('old-date', date.html());
            date.html(date.html() + button_html);
            gamestage.update();
        };

    return {
        'onImageClick' : onImageClick,
        'loadOk'       : loadOk,
        'loadCancel'   : loadCancel
    };
});
