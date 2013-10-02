/*global define, createjs, $ */

/**
 * This is the pane's Verb class
 */
define([
    'engine/config',
    'engine/panel/arrowup',
    'engine/panel/arrowdown'
], function (
    config,
    ArrowUp,
    ArrowDown
) {
    var Dialogs = function (options) {
        this.initialize(options);
    };

    var p = Dialogs.prototype = new createjs.Container();
    p.Dialogs_initialize = p.initialize;
    p.initialize = function (options) {
        this.Dialogs_initialize();

        this.params = config.get('dialogoption.params');

        // memorize on which row are we.
        this.firstRow = 0;
        this.order = 0;

        // mask allows me to scroll dialogs, but show only a window of then
        this.mask = new createjs.Shape();
        this.mask.graphics
            .beginFill("red")
            .drawRect(
                0,
                400,
                800,
                200
            );

        this.arrowUp = new ArrowUp({
            'x' : 0,
            'y' : 420,
            'w' : 40,
            'h' : 90
        });

        this.arrowDown = new ArrowDown({
            'x' : 0,
            'y' : 510,
            'w' : 40,
            'h' : 90
        });

        this.calculateDialogOptionDimensions = function (_order) {

            var positionX = this.params.initialX,
                positionY = this.params.initialY + _order * this.params.incrementY - this.firstRow * this.params.incrementY;

            return {
                'x' : positionX,
                'y' : positionY
            };
        };

        this.numRows = function () {
            var i,
                howmany = 0;

            for (i in this.children) {
                if (this.children[i].name && this.children[i].name.startsWith('dialogoption.')) {
                    howmany++;
                }
            }
            return howmany;
        };

        this.dialogOverflowsFourRows = function () {
             // if we occupy more than two rows
            return (this.numRows() > this.params.maxRows);
        };

        // if render gets options, we will get objects from there, so do not
        // check the childrens.
        this.render = function (options) {

            var dialogoptions = [];
            if (options === undefined) {
                var i;

                for (i in this.children) {
                    if (this.children[i].name && this.children[i].name.startsWith('dialogoption.')) {
                        dialogoptions.push(this.children[i]);
                    }
                }
                this.removeDialogOptions();
            } else {
                dialogoptions = options;
            }

            // the add function will know if objects are just a string reference, or a rendered one
            this.addAll(dialogoptions);


            // check if we need arrows
            if (this.dialogOverflowsFourRows()) {
                // we are not on first row, so print arrow up
                if (this.firstRow !== 0) {
                    this.addChild(this.arrowUp);
                }
                if (this.firstRow + this.params.maxRows !== this.numRows()) {
                    this.addChild(this.arrowDown);
                }
            }
        };

        this.addDialogOptions = function (dialogoptions) {
            var i;
            this.order = 0;
            for (i in dialogoptions) {
                this.add(dialogoptions[i]);
            }
        };

        // Keep tracking of the option index that was clicked;
        // we might want to add additional dialog options next to it
        this.lastOneClicked = undefined;

        this.add = function (dialogoption) {

            if (dialogoption.timesToUse > 0) {
                var position = this.calculateDialogOptionDimensions(this.order);
                dialogoption.x = position.x;
                dialogoption.y = position.y;
                this.addChild(dialogoption);
                this.order++;
            }
        };

        this.addAll = function (options) {
            this.addDialogOptions(options);
        };

        this.removeDialogOptions = function (options) {
            this.removeAllChildren();
        };

        this.render(options);
    };
    return Dialogs;
});
