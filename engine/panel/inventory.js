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

    var p = Inventory.prototype = new createjs.Container();
    p.Inventory_initialize = p.initialize;
    p.initialize = function (options) {
        this.Inventory_initialize();

        this.params = config.get('inventory.params');

        this.calculateObjectDimensions = function (obj, order) {

            var rowNumber = parseInt(order / this.params.maxColumns, 10),
                colNumber = order % this.params.maxColumns,
                positionX = this.params.initialX + colNumber * this.params.incrementX,
                positionXwithMargin = positionX + (colNumber === 0 ? this.params.marginFirstCol : this.params.marginOtherCol),
                positionY = this.params.initialY + rowNumber * this.params.incrementY,
                positionYonMiddle = positionY + (rowNumber === 0 ? this.params.marginFirstCol : this.params.marginOtherCol);

            return {
                'x' : positionXwithMargin,
                'y' : positionYonMiddle,
                'w' : config.get('inventory.x'),
                'h' : config.get('inventory.y')
            };
        };

        this.add = function (option, order) {
            var obj = gameobject.get(option),
                dimensions = this.calculateObjectDimensions(obj,
                    (typeof order !== 'undefined' ? order :
                            (this.children ? this.children.length : 0)
                    )
                    );
            obj.renderAs('inventory', dimensions);
            this.addChild(obj);
        };

        this.remove = function (object) {
            var i,
                o = this.getChildByName(object);
            this.removeChild(o);

            // recalculate other positions;
            for (i in this.children) {
                o = this.getChildAt(i);
                var dimensions = this.calculateObjectDimensions(o, i);
                o.renderAs('inventory', dimensions);
            }
        };

        this.setState = function (json) {
            var i;
            this.removeAllChildren();
            for (i in json) {
                this.add(json[i].name, i);
            }
        };

        this.getState = function () {
            var i,
                inventoryState = [];
            for (i in this.children) {
                inventoryState.push({
                    'name' : this.children[i].name
                });
            }
            return inventoryState;
        };

        this.has = function (object) {
            return (this.getChildByName(object) !== null);
        };

        var i;
        for (i in options) {
            this.add(options[i], i);
        }
    };
    return Inventory;
});
