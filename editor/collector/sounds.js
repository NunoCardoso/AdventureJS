/*global define */

/**
 * This module is a game object class
 */
define([
], function (
) {
    var getSounds = function () {
        var table = document.getElementById('sounds.table'),
            rowLength = table.rows.length,
            i,
            row,
            sound,
            sounds = [];

        for(i=1; i<rowLength; i+=1){
            row = table.rows[i];

            sound = {
                'id'  : row.cells[0].textContent,
                'src' : row.cells[1].textContent
                }
            sounds.push(sound);
            }
        return sounds;
        },
        setSounds = function () {

        }

    return {
        'setSounds' : setSounds,
        'getSounds' : getSounds
    };
});
