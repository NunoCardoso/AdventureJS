/*global define, createjs, template, $, Handlebars */

/**
 * This module bootstraps the game editor
 */
define([
    'engine/lib/assets',
    'editor/dynamicform',
    'text!editor/tpl/editor.template',
    'text!editor/tpl/game.template',
    'text!editor/tpl/assets.template',
    'text!editor/tpl/scenes.template',
    'text!editor/tpl/scene.template',
    'text!editor/tpl/objects.template',
    'text!editor/tpl/object.template',
    'text!editor/tpl/dialogs.template',
    'text!editor/tpl/dialog.template',
    'text!editor/tpl/dialogoptions.template',
    'text!editor/tpl/dialogoption.template',
    'text!editor/tpl/conditions.template',
    'text!editor/tpl/condition.template',
    'text!editor/tpl/interactions.template',
    'text!editor/tpl/interaction.template',
    'text!editor/tpl/characters.template',
    'text!editor/tpl/achievements.template',
    'text!editor/tpl/exits.template'
], function (
    assets,
    dynamicform,
    editor,
    tabgame,
    tabassets,
    tabscenes,
    tabscene,
    tabobjects,
    tabobject,
    tabdialogs,
    tabdialog,
    tabdialogoptions,
    tabdialogoption,
    tabconditions,
    tabcondition,
    tabinteractions,
    tabinteraction,
    tabcharacters,
    tabachievements,
    tabexits
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
            $(".tablesorter").tablesorter();

            dynamicform.configureSelects($("select"));
            dynamicform.onChangeSelects($("select"));
            dynamicform.startInventory();
            dynamicform.onTabClose();
            dynamicform.onTabButtons();
        };

        this.doTemplate = function (item) {
            var h = Handlebars.compile('{{>tab-' + item + '}}');
            return h({});
        };

        this.start = function () {
            this.template = Handlebars.compile(editor);
            Handlebars.registerPartial('tab-game', tabgame);
            Handlebars.registerPartial('tab-assets', tabassets);
            Handlebars.registerPartial('tab-scenes', tabscenes);
            Handlebars.registerPartial('tab-scene', tabscene);
            Handlebars.registerPartial('tab-objects', tabobjects);
            Handlebars.registerPartial('tab-object', tabobject);
            Handlebars.registerPartial('tab-dialogs', tabdialogs);
            Handlebars.registerPartial('tab-dialog', tabdialog);
            Handlebars.registerPartial('tab-dialogoptions', tabdialogoptions);
            Handlebars.registerPartial('tab-dialogoption', tabdialogoption);
            Handlebars.registerPartial('tab-conditions', tabconditions);
            Handlebars.registerPartial('tab-condition', tabcondition);
            Handlebars.registerPartial('tab-interactions', tabinteractions);
            Handlebars.registerPartial('tab-interaction', tabinteraction);
            Handlebars.registerPartial('tab-characters', tabcharacters);
            Handlebars.registerPartial('tab-achievements', tabachievements);
            Handlebars.registerPartial('tab-exits', tabexits);
            /**
             * This is an Handlebar extension for a fancy if comparison
             */
            Handlebars.registerHelper('ifTest', function (conditional, options) {

                var evalStr = '',
                    x,
                    key,
                    context = [options.data, options.hash];

                if (Object.prototype.toString.call(this) === '[object Object]') {
                    context.push(this);
                } else {
                    context.push({ that: this });
                }

                for (x = 0; x < context.length; x++) {
                    for (key in context[x]) {
                        evalStr += 'var ' + key + '=' + JSON.stringify(context[x][key]) + ';';
                    }
                }

                evalStr += conditional.replace(/@/g, '').replace(/this/g, 'that');

                try {
                    if (!eval(evalStr)) {
                        return options.inverse(this);
                    }
                    return options.fn(this);
                } catch (e) {
                    console.error(e + "\n\nThe variable may be outside of this context. Did you forget to add it to the hash? i.e. {{#ifTest 'obj > 1' obj=../obj}}");
                }

            });

            var self = this;
            assets.preload({
                assetList  : game.images.concat(game.sounds),
                onComplete : function (queue) {
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