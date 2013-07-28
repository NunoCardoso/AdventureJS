/*global define */

/**
 * This module stores game panel
 */
define([
    'engine/panel/dialogs',
    'engine/panel/inventory',
    'engine/panel/panel',
    'engine/panel/verbs',
], function (
    Dialogs,
    Inventory,
    Panel,
    Verbs
) {
    var _,
        _verbs,
        _inventory,
        _dialogs,

        preload = function (options) {
            _           = new Panel(options);
            _verbs      = Verbs.init(options.verbs);
            _inventory  = new Inventory(options.startingInventory);
            _dialogs    = new Dialogs({});
        },

        get = function (key) {
            return _;
        },

        addToInventory = function (object) {
            _inventory.add(object);
            _inventory.render();
        },

        removeFromInventory = function (object) {
            _inventory.remove(object);
            _inventory.render();
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
            _.renderForDialog(_dialogs);
        },

        addDialogOptions = function (dialogoptions) {
            _dialogs.addDialogOptions(dialogoptions);
        },

        removeDialogOptions = function () {
            _dialogs.removeDialogOptions();
        };

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
        'addDialogOptions'           : addDialogOptions,
        'removeDialogOptions'        : removeDialogOptions,
    };
});
