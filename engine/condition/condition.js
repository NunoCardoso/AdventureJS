/*global define */

/**
 * This module is a game condition class
 */
define([
], function (
) {
    var GameCondition = function (options) {
        this.name = 'condition.' + options.id;
        this.isInInventory = options.isInInventory;
        this.onSuccess     = options.onSuccess;
        this.onFail        = options.onFail;
    };

    return GameCondition;
});
