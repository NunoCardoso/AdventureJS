/*global define, createjs, document, $ */

define([
    'engine/lib/assets',
    'editor/walkarea/walkarea',
    'games/compass/compass'
], function (
    assets,
    walkarea,
    game
) {

    var _createDialog = function () {
        $('<div id="walkingarea">' +
            '<div>Please draw the walking areas over the scene background. When done, ' +
            'click Export, then scroll down. You will see the drawn image. </div>' +
            '<div>Save the image in your computer, load it as an asset, ' +
            'then attach the image as a walking area on this scene.</div>' +
            '<input type="checkbox" id="toggle" />' +
            '<label for="toggle">Erase</label><br />' +
            '<button id="export">export</button>' +
            '<br>' +
            '<canvas id="walkcanvas" width="800" height="600"></canvas>' +
            '</div>')
                .dialog({
                width  : 820,
                height : 660,
                beforeClose: function () {
                    $('#walkingarea').remove();
                }
            });
    },

        _extractImageFromScene = function (game, scene) {
            var i;
            for (i in game.scenes) {
                if (game.scenes[i].id === scene) {
                    return game.scenes[i].background;
                }
            }
        },

        _generateManifesto = function (imageid) {
            var i;
            for (i in game.images) {
                if (game.images[i].id === imageid) {
                    return [game.images[i]];
                }
            }
        },

        start = function (scene) {
            _createDialog();
            walkarea.wait();

            var background = _extractImageFromScene(game, scene);
            var backgroundManifesto = _generateManifesto(background);

            assets.preload({
                assetList  : backgroundManifesto,
                onComplete : function (queue) {
                    console.log('Assets loaded');
                    assets.setQueueLoaded(queue.target);
                    walkarea.unwait();
                    walkarea.create(background);
                }
            });
        };

    return {
        'start' : start
    };
});