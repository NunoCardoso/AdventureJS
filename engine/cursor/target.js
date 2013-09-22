/*global define, createjs, $*/

/**
 * This module renders a target, so we know where the targetXY is
 */
define([
    'engine/lib/assets',
    'engine/config'
], function (
    assets,
    config
) {
    var Target = function (options) {
        this.initialize(options);
    };

    var p = Target.prototype = new createjs.Bitmap();
    p.Target_initialize = p.initialize;
    p.initialize = function (options) {
        this.Target_initialize();

        this.image  = assets.getQueueLoaded().getResult('image.cursor.target');
        this.regX   = this.image.width  / 2;
        this.regY   = this.image.height / 2;
    };
    return Target;
});
