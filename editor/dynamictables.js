/*global define, $ */

define([
    'engine/interaction/decision',
    'engine/lib/assets'
], function (
    decision,
    assets
) {
    var doTables = function (tables) {
        tables.each(function () {
            var table = $(this),
                id = table.attr('id').replace(/\./, '-');
            table.tablesorter({
                theme: 'blue',
                widthFixed: true,
                widgets: ['zebra', 'editable'],
                widgetOptions: {
                    editable_enterToAccept : true,     // press enter to accept content, or click outside if false
                    editable_autoResort    : false,    // auto resort after the content has changed.
                    editable_noEdit        : 'no-edit' // class name of cell that is no editable
                }
            });

            // add remove column 
            table.find('thead tr th:last').after('<th style="min-width: 50px;"></th>');

            table.find('tbody tr').each(function () {
                var tr = $(this);
                tr.find('td:last').after('<td style="width:50px;">' +
                    '<span style="float:left;" class="ui-icon ui-corner-all ui-icon-closethick"><a href="#">&nbsp;</a></span>' +
                    '<span style="float:left;" class="ui-icon ui-corner-all ui-icon-arrowthick-1-n"><a href="#">&nbsp;</a></span>' +
                    '<span style="float:left;" class="ui-icon ui-corner-all ui-icon-arrowthick-1-s"><a href="#">&nbsp;</a></span>' +
                    '</td>');
            });

            table.on('click', 'span.ui-icon-closethick a', function (e) {
                e.preventDefault();
                var tr = $(e.target).closest('tr');
                $(e.target).closest('td').html('<span style="float:left;" class="ui-icon ui-corner-all ui-icon-check"><a alt="OK" href="#">&nbsp;</a></span>' +
                    '<span class="ui-icon ui-corner-all ui-icon-arrowthick-1-w"><a alt="Cancel" href="#">&nbsp;</a></span>');
                $('.ui-icon-check a').click(function (e) {
                    e.preventDefault();
                    tr.remove();
                    table.trigger('update');
                });
            });
            
            table.on('click', '.ui-icon-arrowthick-1-w a', function (e) {
                e.preventDefault();
                var tr = $(e.target).closest('tr');
                tr.find('td:last').html('<span style="float:left;" class="ui-icon ui-corner-all ui-icon-closethick"><a href="#">&nbsp;</a></span>' +
                '<span style="float:left;" class="ui-icon ui-corner-all ui-icon-arrowthick-1-n"><a href="#">&nbsp;</a></span>' +
                '<span style="float:left;" class="ui-icon ui-corner-all ui-icon-arrowthick-1-s"><a href="#">&nbsp;</a></span>');
                table.trigger('update');
            });

            table.on('click', '.ui-icon-arrowthick-1-n a', function (e) {
                e.preventDefault();
                var tr = $(e.target).closest('tr');
                var prevtr = tr.prev();
                if (prevtr) {
                    tr.after(prevtr);
                    table.trigger('update');
                }
            });
             
            table.on('click', '.ui-icon-arrowthick-1-s a', function (e) {
                e.preventDefault();
                var tr = $(e.target).closest('tr');
                var nexttr = tr.next();
                if (nexttr) {
                    nexttr.after(tr);
                    table.trigger('update');
                }
            });
            // add button
            table.before('<button class="table-button-' + id + '" for="top">Add row on top</button>' +
                '<button class="table-button-' + id + '" for="bottom">Add row on bottom</button>');
            $(".table-button-" + id).button({}).click(function (e) {
                var trclone = table.find("tbody tr:first").clone();
                var role = $(e.target).parent().attr('for');
                trclone.find('td').html('');
                if (role === 'top') {
                    table.prepend(trclone).trigger('addRows', [trclone]);
                } else {
                    table.append(trclone).trigger('addRows', [trclone]);
                }
                table.trigger('update');
            });
        });
    };

    return {
        'doTables' : doTables
    };
});