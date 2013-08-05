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
                        select.append('<option' + d + '>' + '</option>');
                    });
                }
                if (role === 'image') {
                    var tds = $('#images-table tbody tr td.image-id');

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
                    var actions = decision.getAllActions();
                    actions.each(function () {
                        d = (_default === $(this) ? ' selected' : '');
                        select.append('<option' + d + '>' + $(this) + '</option>');
                    });
                }
            });
        };
    return {
        'configureSelects' : configureSelects
    };

});