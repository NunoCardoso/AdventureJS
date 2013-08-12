/*global define */

/**
 * This module is a game object class
 */
define([
], function (
) {
    var getNpcs = function () {
        var table = document.getElementById('npcs.table'),
            rowLength = table.rows.length,
            i,
            row,
            item,
            items = [];

        for(i=1; i<rowLength; i+=1){
            row = table.rows[i];

            item = {
                'id'    : row.cells[0].textContent,
                'label' : row.cells[1].textContent
                }
            items.push(item);

            return items;
            }
        },
        setNpcs = function () {

        }

    return {
        'setNpcs' : setNpcs,
        'getNpcs' : getNpcs
    };
});
