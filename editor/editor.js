/*global define, createjs, template, $, Handlebars */

/**
 * This module bootstraps the game editor
 */
define([
    'engine/lib/assets',
    'editor/dynamicform',
    'editor/dynamictables',
    'editor/handlebar'
], function (
    assets,
    dynamicform,
    dynamictables,
    handlebar
) {
    var Editor = function (game) {
        this.initialize(game);
    };

    var p = Editor.prototype;
    p.initialize = function (game) {

        this._game = game;
        this.template = undefined;

        this._doDynamicForm = function () {

            // prepend to body
            $('body').html(this.template(game) + $('body').html());
            $(".tabs").tabs();
            $(".verticaltabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
            $(".verticaltabs li").removeClass("ui-corner-top").addClass("ui-corner-left");

            dynamicform.configureSelects($("select"));
            dynamicform.onChangeSelects($("select"));
            dynamicform.startInventory();
            dynamicform.onTabClose();
            dynamicform.onTabButtons();
            dynamictables.doTables($(".tablesorter"));
        };

        this.doTemplate = function (item) {
            var h = Handlebars.compile('{{>tab-' + item + '}}');
            return h({});
        };

        this.start = function () {
            this.template = handlebar.init();
            var self = this;
            $('body').html('Loading editor... please wait.');
            assets.preload({
                assetList  : game.images.concat(game.sounds),
                onComplete : function (queue) {            
                    $('body').html('');
                    assets.setQueueLoaded(queue.target);
                    self._doDynamicForm();
                }
            });
        };
    };
    return Editor;
});

// tweak String prototype
if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) === str;
    };
}
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) === str;
    };
}