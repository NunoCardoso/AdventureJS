/*global define, $ */

define([
    'engine/game',
    'games/compass/compass',
    'editor/drag/util',
    'editor/drag/drag'
], function (
    Game,
    compass,
    dragutil,
    drag
) {
    var game,
        _createDialog = function () {
            $('<div id="drag-dialog">' +
                '<div style="width:150px;float:left;">' +
                    '<div>Drag the item</div>' +
                    '<select size=1 onChange="require(\'editor/drag/util\').addObject(this);">' +
                    '<option>object.winebottle</option>' +
                    '<option>object.tshirt</option>' +
                    '</select>' +
                    '<img id="dragimage"/>' +
                '</div>' +
                '<div id="canvasdiv">' +
                '<canvas id="dragcanvas" width="800" height="400"></canvas>' +
                '</div>' +
                '</div>')
                .dialog({
                    width  : 1020,
                    height : 660,
                    beforeClose: function () {
                        $('#drag-dialog').remove();
                    }
                });
        },

        _initGame = function () {
            game = new Game();
            game.init();
            game.load(compass);
        },

        start = function (scene) {
            _createDialog();
            _initGame();
            game.start({
                scene   : scene || 'scene.menu',
                canvas  : 'dragcanvas',
                role    : 'editor'
            });
        };

    return {
        'start' : start
    };
});