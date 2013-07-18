/*global define, createjs, $ */

/**
 * This is the pane's Verb class
 */
define([
    'engine/object/main',
    'engine/character/main',
    'engine/config'
], function (
    gameobject,
    gamecharacter,
    config
) {
    var Inventory = function (options) {
        this.initialize(options);
    };

    Inventory.prototype = new createjs.Container();
    Inventory.prototype.Inventory_initialize = Inventory.prototype.initialize;
    Inventory.prototype.initialize = function (options) {
        this.Inventory_initialize();

        this.inventoryParams = {
            initialX   : 440,
            initialY   : 420,
            incrementX : 90,
            incrementY : 90,
            maxColumns : 4,
            marginFirstCol : 5,
            marginOtherCol : 10
        };

        this.calculateObjectPosition = function (i) {

            var rowNumber = parseInt(i / this.inventoryParams.maxColumns, 10),
                colNumber = i % this.inventoryParams.maxColumns,
                positionX = this.inventoryParams.initialX + colNumber * this.inventoryParams.incrementX,
                positionXwithMargin = positionX + (colNumber === 0 ? this.inventoryParams.marginFirstCol : this.inventoryParams.marginOtherCol),
                positionY = this.inventoryParams.initialY + rowNumber * this.inventoryParams.incrementY,
                positionYonMiddle = positionY + (rowNumber === 0 ? this.inventoryParams.marginFirstCol : this.inventoryParams.marginOtherCol);

            return {
                'x' : positionXwithMargin,
                'y' : positionYonMiddle
            };
        };

        var i;
        for (i = 0; i < options.length; i++) {
            var position = this.calculateObjectPosition(i);
            var obj = gameobject.get(options[i]);
            obj.renderAs('inventory');
            obj.x = position.x;
            obj.y = position.y;
            obj.activateClickListener(gamecharacter.getPlayableCharacter());
            this.addChild(obj);
        }
    };
    return Inventory;
});
