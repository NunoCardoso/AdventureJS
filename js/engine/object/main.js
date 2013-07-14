/*global define, createjs, $ */

/**
 * This module handles the playable character
 */
define([
    'engine/object/gameobject'
], function (
    GameObject
) {

    var _ = {},

        load = function (objects) {
            var i;
            for (i = 0; i < objects.length; i++) {
                _[objects[i].id] = new GameObject(objects[i]);
            }
        },

        get = function (key) {
            return _[key];
        };

    return {
        'load' : load,
        'get'  : get
    };
});
