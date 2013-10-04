/*global define, createjs, $ */

/**
 * This module handles panel background
 */
define([
    'engine/config',
    'engine/lib/assets'
], function (
    config,
    assets
) {
    var Background = function () {
        this.initialize();
    };

    var p = Background.prototype = new createjs.Container();
    p.Background_initialize = p.initialize;
    p.initialize = function () {
        this.Background_initialize();

        this.name = "background.panel";
        this.b = new createjs.Shape();
        this.b.graphics.beginFill("black")
            .drawRect(
                config.get('panel.x'),
                config.get('panel.y'),
                config.get('panel.w'),
                config.get('panel.h')
            );

        this.image = new createjs.Bitmap();
        this.image.image = assets.getQueueLoaded().getResult('image.panel.background');
        this.image.y = config.get('panel.y') + 30;

        this.addChild(this.b);
        this.addChild(this.image);
    };
    return Background;
});
