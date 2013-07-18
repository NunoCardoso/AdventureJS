/*global define, createjs, template, $, Handlebars */

/**
 * This module bootstraps the game editor
 */
define([
    'text!editor/tpl/parent.template',
    'text!editor/tpl/main.template',
    'text!editor/tpl/images.template',
    'text!editor/tpl/scenes.template',
    'text!editor/tpl/scene.template',
    'text!editor/tpl/objects.template',
    'text!editor/tpl/object.template',
    'text!editor/tpl/dialogs.template',
    'text!editor/tpl/dialog.template',
    'text!editor/tpl/interactions.template',
    'text!editor/tpl/interaction.template',
    'text!editor/tpl/characters.template',
    'text!editor/tpl/character.template',
], function (
    parent,
    tabmain,
    tabimages,
    tabscenes,
    tabscene,
    tabobjects,
    tabobject,
    tabdialogs,
    tabdialog,
    tabinteractions,
    tabinteraction,
    tabcharacters,
    tabcharacter
) {
    var editor = function (game) {

        var start = function () {
            var template = Handlebars.compile(parent);
            Handlebars.registerPartial('tab-main', tabmain);
            Handlebars.registerPartial('tab-images', tabimages);
            Handlebars.registerPartial('tab-scenes', tabscenes);
            Handlebars.registerPartial('tab-scene', tabscene);
            Handlebars.registerPartial('tab-objects', tabobjects);
            Handlebars.registerPartial('tab-object', tabobject);
            Handlebars.registerPartial('tab-dialogs', tabdialogs);
            Handlebars.registerPartial('tab-dialog', tabdialog);
            Handlebars.registerPartial('tab-interactions', tabinteractions);
            Handlebars.registerPartial('tab-interaction', tabinteraction);
            Handlebars.registerPartial('tab-characters', tabcharacters);
            Handlebars.registerPartial('tab-character', tabcharacter);

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

            $('body').html(template(game));
            $(".tabs").tabs();
            $(".verticaltabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
            $(".verticaltabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
            $(".tablesorter").tablesorter();
        };

        return {
            'start' : start
        };
    };
    return editor;
});