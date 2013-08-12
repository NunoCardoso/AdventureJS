/*global define */

/**
 * This module is a game object class
 */
define([
], function (
) {
    var getMainData = function () {
        var title = document.getElementById('main.title').value,
            author = document.getElementById('main.author').value,
            description = document.getElementById('main.description').textContent,
            //background = document.getElementById('main.background').value,
            //startingScene = document.getElementById('main.startingScene').value,
            retval,
            backgroundelement = document.getElementById("main.background"),
            background = "",
            startingelement = document.getElementById("main.background"),
            startingScene = "";

        if(backgroundelement > -1) {
            background = backgroundelement.options[backgroundelement.selectedIndex].text;
        }

        if(startingelement > -1) {
            startingScene = startingelement.options[startingelement.selectedIndex].text;
        }

        retval =
            {
            'title'  : title,
            'author' : author,
            'description' : description,
            'background'  : background,
            'startingScene' : startingScene
            };

            return retval;
        },
        setMainData = function () {

        }

    return {
        'setMainData' : setMainData,
        'getMainData' : getMainData
    };
});
