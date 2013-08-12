/*global define, createjs, $ */

/**
 * This is the pane's Verb class
 */
define([
    'engine/object/main',
    'engine/character/main',
    'engine/config',
    'engine/panel/arrowup',
    'engine/panel/arrowdown'
], function (
    gameobject,
    gamecharacter,
    config,
    ArrowUp,
    ArrowDown
) {
    var Inventory = function (options) {
        this.initialize(options);
    };

    var p = Inventory.prototype = new createjs.Container();
    p.Inventory_initialize = p.initialize;
    p.initialize = function (options) {
        this.Inventory_initialize();

        this.params = config.get('inventory.params');

        // memorize on which row are we.
        this.firstRow = 0;

        // mask allows me to scroll inventory, but show only a window of then
        this.mask = new createjs.Shape();
        this.mask.graphics
            .beginFill("red")
            .drawRect(
                400,
                420,
                400,
                180
            );

        this.arrowUp = new ArrowUp({
            'x' : 400,
            'y' : 420,
            'w' : 40,
            'h' : 90
        });

        this.arrowDown = new ArrowDown({
            'x' : 400,
            'y' : 510,
            'w' : 40,
            'h' : 90
        });

        this.calculateObjectDimensions = function (obj, order) {

            var rowNumber = parseInt(order / this.params.maxColumns, 10),
                colNumber = order % this.params.maxColumns,
                positionX = this.params.initialX + colNumber * this.params.incrementX,
                positionY = this.params.initialY + rowNumber * this.params.incrementY - this.firstRow * this.params.incrementY;

            return {
                'x' : positionX,
                'y' : positionY,
                'w' : config.get('inventory.x'),
                'h' : config.get('inventory.y')
            };
        };

        this.numInventoryRows = function () {
            var i,
                howmany = 0;

            for (i in this.children) {
                if (this.children[i].name && this.children[i].name.startsWith('object.')) {
                    howmany++;
                }
            }
            return Math.ceil(howmany / config.get('inventory.params').maxColumns);
        };

        this.inventoryOverflowsTwoRows = function () {
             // if we occupy more than two rows
            return (this.numInventoryRows() > 2);
        };

        // if render gets options, we will get objects from there, so do not
        // check the childrens.
        this.render = function (options) {

            var objects = [];
            if (options === undefined) {
                var i;

                for (i in this.children) {
                    if (this.children[i].name && this.children[i].name.startsWith('object.')) {
                        objects.push(this.children[i]);
                    }
                }
                this.removeAllChildren();
            } else {
                objects = options;
            }

            // the add function will know if objects are just a string reference, or a rendered one
            this.addAll(objects);

            // check if we need arrows
            if (this.inventoryOverflowsTwoRows()) {
                // we are not on first row, so print arrow up
                if (this.firstRow !== 0) {
                    this.addChild(this.arrowUp);
                }
                if (this.firstRow + config.get('inventory.params').maxRows
                        !== this.numInventoryRows()) {
                    this.addChild(this.arrowDown);
                }
            }
        };

        this.add = function (object, order) {
            var obj;
            if (typeof object === 'string') {
                obj = gameobject.get(object);
            } else {
                obj = object;
            }

            var dimensions = this.calculateObjectDimensions(obj,
                    (order !== undefined ? order :
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

        this.addAll = function (options) {
            var i;
            for (i in options) {
                this.add(options[i], i);
            }
        };

        this.render(options);
    };
    return Inventory;
});
