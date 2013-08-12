/*global define */

/**
 * This module is a game object class
 */
define([
], function (
) {
    var getStartingInventory = function () {
        var table = document.getElementById('panel.startingInventory'),
            itemCount = table.length,
            i,
            row,
            item,
            items = [];

        for(i=0; i<itemCount; i+=1){
            item = table[i].innerText;
            items.push(item);
            }

            return items;
        },
        setStartingInventory = function () {

        }

    return {
        'setStartingInventory' : setStartingInventory,
        'getStartingInventory' : getStartingInventory
    };
});
