/*global define */

/**
 * This module is a game object class
 */
define([
], function (
) {
    var getImages = function () {
        var table = document.getElementById('images.table'),
            rowLength = table.rows.length,
            i,
            row,
            image,
            images = [];

        for(i=1; i<rowLength; i+=1){
            row = table.rows[i];

            //your code goes here, looping over every row.
            //cells are accessed as easy
            image = {
                'id'  : row.cells[0].textContent,
                'src' : row.cells[1].textContent
                }
            images.push(image);
            }
        return images;
        },
        setImages = function () {

        }

    return {
        'setImages' : setImages,
        'getImages' : getImages
    };
});
