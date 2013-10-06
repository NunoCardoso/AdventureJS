/*global define, $, document */

define([
    'engine/config'
], function (
    config
) {
    var _getDateHtml = function () {
            var currentdate = new Date();
            return "<span>" + currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds() + "</span>";
        },

        _restoreSlot = function (item) {
            if ($(item).data('old-src')) {
                item.src = $(item).data('old-src');
                $(item).removeData('old-src');
                var date = $(item).closest('.savegame').find('.date');
                date.html(date.data('old-date'));
                date.removeData('old-date');
            }
        },

        _getSnapshotFromImage = function (img) {
            var tmpcanvas    = document.createElement("canvas");
            tmpcanvas.width  = config.get('screenshot.x');
            tmpcanvas.height = config.get('screenshot.y');
            var ctx = tmpcanvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height,
                0, 0, tmpcanvas.width, tmpcanvas.height);
            return tmpcanvas.toDataURL('image/jpg');
        },

        // iterate images, if they have a stored snapshot, restore it
        _restoreSavegameSlots = function () {
            $("#savegame-items").find('img').each(function (i, item) {
                _restoreSlot(item);
            });
            $(".buttons").html("");
        },

        saveOk = function (button) {
            var tr = $(button).closest(".savegame");
            var date = tr.find('.date').html();
            var image = _getSnapshotFromImage(tr.find('img')[0]);
            var json = require('engine/stage/main').getSavegame(); // savegame JSON was stored here
            var slot = parseInt(tr.find(".slot").html(), 10);
            require('engine/savegame/main').save(json, slot, image, date);
            require('engine/tpl/main').close();

        },

        saveCancel = function (button) {
            var img = $(button).closest(".savegame").find("img");
            _restoreSlot(img[0]);
        },

        onImageClick = function (link) {

            var newSnapshot = require('engine/stage/main').getSnapshot();
            var trgImage = $(link).find("img");
            var tr = $(link).closest('.savegame');

            var info = tr.find(".info");
            var date = info.find('span.date');
            var buttons = info.find('span.buttons');

            _restoreSavegameSlots();

            // backup old snapshot
            var oldSnapshot = _getSnapshotFromImage(trgImage[0]);

            trgImage[0].src = newSnapshot;
            trgImage.data('old-src', oldSnapshot);

            // backup old data
            date.data('old-date', date.html());

            var button_html = "<br><button class='okbutton' onClick=\"require('engine/savegame/save').saveOk(this);return false;\">OK</button>";
            button_html += "<br><button class='cancelbutton' onClick=\"require('engine/savegame/save').saveCancel(this);return false;\">Cancel</button>";

            date.html('');
            buttons.html(button_html);

            require('engine/stage/main').update();
        };

    return {
        'onImageClick' : onImageClick,
        'saveOk'       : saveOk,
        'saveCancel'   : saveCancel
    };
});
