/*global define */

/**
 * This module stores game panel
 */
define([
    'engine/panel/inventory',
    'engine/panel/panel',
    'engine/panel/verbs',
], function (
    Inventory,
    Panel,
    Verbs
) {
    var _,
        _verbs,
        _inventory,

        preload = function (options) {
            _           = new Panel(options);
            _verbs      = Verbs.init(options.verbs);
            _inventory  = new Inventory(options.startingInventory);
        },

        get = function (key) {
            return _;
        },

        addToInventory = function (object) {
            _inventory.add(object);
        },

        removeFromInventory = function (object) {
            _inventory.remove(object);
        },

        isInInventory = function (object) {
            return _inventory.has(object);
        },

        getVerbs = function () {
            return _verbs;
        },

        getInventory = function () {
            return _inventory;
        },

        renderForVerbsAndInventory = function () {
            _.renderForVerbsAndInventory(_verbs, _inventory);
        },

        renderForDialog = function () {
            _.renderForDialog();
        },

        addDialogs = function (dialogs) {
            _.addDialogs(dialogs);
        }

    return {
        'preload'                    : preload,
        'get'                        : get,
        'addToInventory'             : addToInventory,
        'removeFromInventory'        : removeFromInventory,
        'isInInventory'              : isInInventory,
        'getInventory'               : getInventory,
        'getVerbs'                   : getVerbs,
        'renderForVerbsAndInventory' : renderForVerbsAndInventory,
        'renderForDialog'            : renderForDialog,
        'addDialogs'                 : addDialogs
    };
});
