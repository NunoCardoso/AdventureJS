/*global define */

/**
 * This module handles objects
 */
define([
    'engine/object/object'
], function (
    GameObject
) {

    var _ = {},

        preload = function (objects) {
            var i;
            for (i = 0; i < objects.length; i++) {
                _[objects[i].id] = new GameObject(objects[i]);
            }
        },

        get = function (key) {
            return _[key];
        };

    return {
        'preload' : preload,
        'get'     : get
    };
});
