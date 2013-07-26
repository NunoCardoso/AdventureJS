/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/config',
    'engine/panel/background',
], function (
    config,
    Background
) {
    var Panel = function (options) {
        this.initialize(options);
    };

    var p = Panel.prototype = new createjs.Container();
    p.Panel_initialize = p.initialize;
    p.initialize = function (options) {
        this.Panel_initialize();

        this.background = new Background();
        this.name = 'panel';
        this.mode = '';

        this.renderForVerbsAndInventory = function (verbs, inventory) {
            if (this.mode === 'verbsAndInventory') {
                // I am already rendered as such, so nothing to do there
                return;
            }

            this.removeAllChildren();
            this.addChild(
                this.background,
                inventory
            );
            var i;
            for (i in verbs) {
                this.addChild(verbs[i]);
            }
            this.mode = 'verbsAndInventory';
        };

        this.renderForDialog = function () {
            this.removeAllChildren();
            this.addChild(
                this.background
            );
            this.mode = 'dialog';
        };

        this.addDialogs = function (dialogs) {
            this.addChild(dialogs);
        };
    };
    return Panel;
});