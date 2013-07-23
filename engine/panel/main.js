/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/config',
    'engine/panel/verbs',
    'engine/panel/background',
    'engine/panel/inventory'
], function (
    config,
    Verbs,
    Background,
    Inventory
) {
    var background,
        inventory,
        verbs,
        container,


        preload = function (options) {

            background = new Background();
            verbs = Verbs.init(options.verbs);
            inventory = new Inventory(options.startingInventory);
        },

        get = function () {
            if (typeof container !== 'undefined') {
                return container;
            }
            var i;
            container = new createjs.Container();
            container.name = 'container.panel';

            container.addChild(
                background,
                inventory
            );
            for (i = 0; i < verbs.length; i++) {
                container.addChild(verbs[i]);
            }
            return container;
		},

        addToInventory = function (object) {
            inventory.add('object.' + object);
        },

        removeFromInventory = function (object) {
            inventory.remove(object);
        },

        isInInventory = function (object) {
            return inventory.has(object);
        },

        getInventory = function () {
            return inventory;
        };

    return {
        'preload'     : preload,
        'get'         : get,
        'addToInventory' : addToInventory,
        'removeFromInventory' : removeFromInventory,
        'isInInventory'  : isInInventory,
        'getInventory' : getInventory
    };
});