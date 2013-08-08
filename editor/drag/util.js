/*global define, $ */

/**
 * ajuda 
 */

define([
    'engine/object/main',
    'engine/stage/main'
], function (
    gameobject,
    gamestage
) {

    var addObject = function (select) {
        var option = $(select).find('option:selected').val();
        var selectid = $(select).attr('id');
        var o = gameobject.get(option);
        if (o.imageInStage) {
            var image = $("img[for='" + selectid + "']");
            image[0].src = o.imageInStage.src;
            $("img").draggable({ helper: "clone" });
            var scene = gamestage.getInstance().getCurrentScene();
            $("img").on("dragstop", function (event, ui) {
                scene.addObject({
                    'id' : option,
                    'x'  : ui.offset.left - 50,
                    'y'  : ui.offset.top - 50,
                    'w'  : 50,
                    'h'  : 50
                });
                scene.render();
                gamestage.update();
            });
        }
    };

    return {
        'addObject' : addObject
    };
});
