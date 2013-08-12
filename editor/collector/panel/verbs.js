/*global define */

/**
 * This module is a game object class
 */
define([
], function (
) {
    var getVerbs = function () {
        var table = document.getElementById('panel.verbs'),
            rowLength = table.rows.length,
            i,
            row,
            item,
            items = [];

        for(i=1; i<rowLength; i+=1){
            row = table.rows[i];

            item = {
                'first' : row.cells[0].textContent,
                'nr'    : row.cells[1].textContent
//                'second': row.cells[2].textContent
                }
            if (row.cells[2].textContent) {
                item.second = row.cells[2].textContent;
            }
            items.push(item);
            }
        return items;
        },
        setVerbs = function () {
/*
'verbs' : [
                {'first': 'Give',    'nr' : 2, 'second': 'to'},
                {'first': 'Use',     'nr' : 2, 'second': 'with'},
                {'first': 'Pick up', 'nr' : 1},
                {'first': 'Open',    'nr' : 1},
                {'first': 'Push',    'nr' : 1},
                {'first': 'Look at', 'nr' : 1},
                {'first': 'Close',   'nr' : 1},
                {'first': 'Pull',    'nr' : 1},
                {'first': 'Talk to', 'nr' : 1}
            ]
*/
        }

    return {
        'setVerbs' : setVerbs,
        'getVerbs' : getVerbs
        };
});
