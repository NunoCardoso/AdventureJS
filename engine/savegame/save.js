/*global define, $, document */

define([
    'engine/config',
    'engine/stage/main',
], function (
    config,
    gamestage
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
                var date = $(item).closest('tr').find('td.date');
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
        _restoreSavegameSlots = function (table) {
            table.find('img').each(function (i, item) {
                _restoreSlot(item);
            });
        },

        saveOk = function (button) {
            var tr = $(button).closest("tr");
            var date = tr.find('td.date span').html();
            var image = _getSnapshotFromImage(tr.find('img')[0]);
            var json = gamestage.getSavegame(); // savegame JSON was stored here
            var slot = parseInt(tr.find("td.slot").html(), 10);
            require('engine/savegame/main').save(json, slot, image, date);
            require('engine/tpl/main').close();

        },

        saveCancel = function (button) {
            var img = $(button).closest("tr").find("img");
            _restoreSlot(img[0]);
        },

        onImageClick = function (link) {

            var newSnapshot = gamestage.getSnapshot();
            var trgImage = $(link).find("img");
            var tr = $(link).closest('tr');
            var table = $(link).closest('table');

            _restoreSavegameSlots(table);

            // backup old snapshot
            var oldSnapshot = _getSnapshotFromImage(trgImage[0]);

            trgImage[0].src = newSnapshot;
            trgImage.data('old-src', oldSnapshot);

            // backup old data
            var date = tr.find("td.date");
            date.data('old-date', date.html());

            var button_html = "<br><button onClick=\"require('engine/savegame/save').saveOk(this);return false;\">OK</button>";
            button_html += "<br><button onClick=\"require('engine/savegame/save').saveCancel(this);return false;\">Cancel</button>";

            date.html(_getDateHtml() + button_html);
            gamestage.update();
        };

    return {
        'onImageClick' : onImageClick,
        'saveOk'       : saveOk,
        'saveCancel'   : saveCancel
    };
});
