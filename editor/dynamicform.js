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
                    var objects = $('div.editor-objects ul li a');

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
                    var scenes = $('div.editor-scenes ul li a');
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
        };

    return {
        'configureSelects' : configureSelects,
        'onChangeSelects'  : onChangeSelects,
        'startInventory'   : startInventory
    };

});