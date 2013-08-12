/*global define, $ */

define([
    'engine/interaction/decision',
    'engine/lib/assets'
], function (
    decision,
    assets
) {
    var configureSelects = function (selects) {
            selects.each(function () {
                var select = $(this),
                    role = select.attr('role'),
                    val,
                    d,
                    tds,
                    _default = select.data('default');
                if (role) {
                    select.find('option').remove();
                    select.append('<option>--</option>');
                }
                if (role === 'object') {
                    var objects = $('div.editor-objects ul li a.ui-tabs-anchor');

                    objects.each(function () {
                        val = $(this).html();
                        d = (_default === val ? ' selected' : '');
                        select.append('<option' + d + '>' + val + '</option>');
                    });
                }
                if (role === 'image') {
                    tds = $('#images-table tbody tr td.image-id');

                    tds.each(function () {
                        val = $(this).html();
                        var image = $("img[for='" + select.attr('id') + "']");
                        d = (_default === val ? ' selected' : '');
                        select.append('<option' + d + '>' + $(this).html() + '</option>');

                        if (d && image.length > 0) {
                            image[0].src = assets.getQueueLoaded().getResult(val).src;
                        }
                    });
                }
                if (role === 'scene') {
                    var scenes = $('div.editor-scenes ul li a.ui-tabs-anchor');
                    val = $(this).html();
                    d = (_default === val ? ' selected' : '');
                    scenes.each(function () {
                        select.append('<option' + d + '>' + $(this).html() + '</option>');
                    });
                }
                if (role === 'actions') {
                    var i, actions = decision.getAllActions();
                    for (i in actions) {
                        d = (_default === actions[i] ? ' selected' : '');
                        select.append('<option' + d + '>' + actions[i] + '</option>');
                    }
                }
                if (role === 'verbs') {

                    tds = $('#verbs-table tbody tr td.verb-first');

                    tds.each(function () {
                        val = $(this).html();
                        d = (_default === val ? ' selected' : '');
                        select.append('<option' + d + '>' + val + '</option>');
                    });
                }
            });
        },

        onChangeSelects = function (selects) {
            selects.each(function () {
                var select = $(this),
                    role = select.attr('role');
                if (role) {
                    select.on('change', function () {
                        if (role === 'image') {
                            var val = select.find('option:selected').val();
                            var image = $("img[for='" + select.attr('id') + "']");
                            if (image.length > 0) {
                                image[0].src = assets.getQueueLoaded().getResult(val).src;
                            }
                        }
                    });
                }
            });
        },

        startInventory = function () {
            var i,
                startInventory = [],
                objects = [],
                notInInventory = [];

            $("#startingInventory option").each(function () {
                startInventory.push($(this).html());
            });

            $('div.editor-objects ul li a').each(function () {
                objects.push($(this).html());
            });

            for (i in objects) {
                if ($.inArray(objects[i], startInventory) < 0) {
                    notInInventory.push(objects[i]);
                }
            }

            $("#notOnStartingInventory").find('option').remove();
            for (i in notInInventory) {
                $("#notOnStartingInventory").append('<option>' + notInInventory[i] + '</option>');
            }

            $("#removeFromInventory").on('click', function () {
                var i, selected = $("#startingInventory option:selected");
                selected.remove();
                selected.each(function () {
                    $("#notOnStartingInventory").append('<option>' + $(this).html() + '</option>');
                });
            });

            $("#addToInventory").on('click', function () {
                var i, selected = $("#notOnStartingInventory option:selected");
                selected.remove();
                selected.each(function () {
                    $("#startingInventory").append('<option>' + $(this).html() + '</option>');
                });
            });
        },

        onTabClose = function () {
            $('body').on('click', '.ui-icon-circle-close a', function (e) {
                e.preventDefault();
                var li = $(e.target).closest("li");
                var item = li.find('a.ui-tabs-anchor').attr('href');
                var tabs = li.closest('.verticaltabs');
                $('<div id="close-dialog">' +
                    'Are you sure you want to delete ' + item + ' ?' +
                    '</div>')
                    .dialog({
                        resizable: false,
                        modal: true,
                        buttons: [
                            {
                                text  : "Delete " + item,
                                click : function () {
                                    li.remove();
                                    $(item).remove();
                                    tabs.tabs("refresh");
                                    $(this).dialog("close");
                                }
                            },
                            {
                                text  : "Cancel",
                                click : function () {
                                    $(this).dialog("close");
                                }
                            }
                        ]
                    });
            });
        },

        onTabButtons = function () {
            $('button.new').button();
            $('body').on('click', 'button.new', function (e) {
                var tab = $(e.target).closest('.verticaltabs');
                var ul = tab.find('ul.ui-tabs-nav');
                var lis = ul.find('li');
                var item = $(e.target).parent().data("role");
                var valu = item + '.' + (lis.length + 1);
                var lastli = ul.find('li:last');
                lastli.after('<li>' +
                     '<a href="#' + valu + '">' + valu + '</a>' +
                     '<span class="ui-icon ui-icon-circle-close ui-closable-tab">' +
                     '<a href="#"></a></span></li>');

                var html = require('editor/main').get().doTemplate(item);
                html = '<div id="' + valu + '">' + html + '</div>';

                tab.find('div.ui-tabs-panel:last').after(html);
                tab.tabs('refresh');
            });
        };

 

    return {
        'configureSelects' : configureSelects,
        'onChangeSelects'  : onChangeSelects,
        'startInventory'   : startInventory,
        'onTabClose'       : onTabClose,
        'onTabButtons'     : onTabButtons
    };
});