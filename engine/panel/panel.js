/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/config',
    'engine/panel/background',
    'engine/sentence/main'
], function (
    config,
    Background,
    gamesentence
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
            // ask inventory to re-render
            inventory.render();

            this.removeAllChildren();
            this.addChild(
                this.background,
                inventory,
                gamesentence.get()
            );
            var i;
            for (i in verbs) {
                this.addChild(verbs[i]);
            }
            this.mode = 'verbsAndInventory';
        };

        this.renderForDialog = function (dialogs) {

            dialogs.render();

            this.removeAllChildren();
            this.addChild(
                this.background,
                dialogs
            );
            this.mode = 'dialog';
        };
    };
    return Panel;
});