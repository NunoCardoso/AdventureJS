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

        this.total = 0;

        this.calculateObjectPosition = function (obj, order) {

            var rowNumber = parseInt(order / this.inventoryParams.maxColumns, 10),
                colNumber = order % this.inventoryParams.maxColumns,
                positionX = this.inventoryParams.initialX + colNumber * this.inventoryParams.incrementX,
                positionXwithMargin = positionX + (colNumber === 0 ? this.inventoryParams.marginFirstCol : this.inventoryParams.marginOtherCol),
                positionY = this.inventoryParams.initialY + rowNumber * this.inventoryParams.incrementY,
                positionYonMiddle = positionY + (rowNumber === 0 ? this.inventoryParams.marginFirstCol : this.inventoryParams.marginOtherCol);

            obj.x = positionXwithMargin;
            obj.y = positionYonMiddle;
        };

        this.add = function (option, position) {
            var obj = gameobject.get(option);
            position = position || this.total;
            obj.renderAs('inventory');
            this.calculateObjectPosition(obj, position);
            this.addChild(obj);
            obj.activateClickListener(gamecharacter.getPlayableCharacter());
            this.total++;
        };

        this.remove = function (object) {
            var i,
                o = this.getChildByName('object.' + object);
            var index = this.getChildIndex(o);
            this.removeChild(o);
            this.total--;
            // recalculate other positions;
            for (i = index; i < this.total; i++) {
                o = this.getChildAt(i);
                this.calculateObjectPosition(o, i);
            }
        };

        this.setState = function (json) {
            var i;
            this.removeAllChildren();
            for (i = 0; i < json.length; i++) {
                this.add(json[i].name, i);
            }
        };

        this.getState = function () {
            var i,
                inventoryState = [];
            for (i = 0; i < this.children.length; i++) {
                inventoryState.push({
                    'name' : this.children[i].name
                });
            }
            return inventoryState;
        };

        this.has = function (object) {
            return (this.getChildByName('object.' + object) !== null);
        };

        var i;
        for (i = 0; i < options.length; i++) {
            this.add('object.' + options[i], i);
        }
    };
    return Inventory;
});
