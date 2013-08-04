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
        var image = $(select).closest('div').find('img#dragimage');
        var o = gameobject.get(option);
        image[0].src = o.imageInStage.src;
        $("img").draggable({ helper: "clone" });
        var scene = gamestage.getInstance().getCurrentScene();
        $("img").on("dragstop", function (event, ui) {
            scene.addObject({
                'id' : option,
                'x'  : ui.offset.left,
                'y'  : ui.offset.top,
                'w'  : 50,
                'h'  : 50
            })
            scene.render();
            gamestage.update();
        });
    };

    return {
        'addObject' : addObject
    };
});
