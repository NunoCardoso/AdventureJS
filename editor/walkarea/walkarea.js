/*global define, $, createjs, document */

define([
    'engine/lib/assets'
], function (
    assets
) {

    var stage,

        wait = function () {
            if (!stage) {
                stage = new createjs.Stage("walkcanvas");
            }
            var title = new createjs.Text("Please wait...", "36px the8bit", "#777777");
            title.name = "pleasewait";
            title.x = 300;
            title.y = 200;
            stage.addChild(title);
            stage.update();
        },

        unwait = function () {
            stage.removeAllChildren();
            stage.update();
        },

        create = function (imageid) {

            // first, get the scene background image

            createjs.Ticker.addEventListener("tick", stage);

            $('#export').on('click', function (e) {
                stage.getChildByName('background').visible = false;
                stage.update();
                var canvas = document.getElementById("walkcanvas");
                var img    = canvas.toDataURL("image/png");
                var imgplace = $("#myimage");
                if (imgplace.length === 0) {
                    $('#walkingarea').append('<img id="myimage" src="' + img + '"/>');
                } else {
                    imgplace[0].src = img;
                }
                stage.getChildByName('background').visible = true;
                stage.update();
            });

            var img = new createjs.Bitmap(
                assets.getQueueLoaded().getResult(imageid)
            );
            img.name = "background";
            img.scaleX = 800 / img.image.width;
            img.scaleY = 600 / img.image.height;
            console.log(img.scaleX);
            stage.addChild(img);

            var wrapper = new createjs.Container();
            wrapper.hitArea = new createjs.Shape(
                new createjs.Graphics().f("#000").dr(0, 0, 800, 600)
            );
            wrapper.cache(0, 0, 800, 600);
            stage.addChild(wrapper);

            var drawing = new createjs.Shape();
            wrapper.addChild(drawing);

            var oldPt, oldMidPt;

            wrapper.addEventListener("mousedown", function (event) {

                // Store the position. We have to do this because we clear the graphics later.
                oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
                oldMidPt = oldPt;

                // Listen for mousemove
                event.addEventListener("mousemove", function (event) {

                    var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

                    // Draw a round line from the last position to the current one.
                    drawing.graphics
                        .ss(20, "round")
                        .s("#ff0000")
                        .mt(midPt.x, midPt.y)
                        .curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

                    oldPt.x = stage.mouseX;
                    oldPt.y = stage.mouseY;
                    oldMidPt.x = midPt.x;
                    oldMidPt.y = midPt.y;

                    // Draw onto the canvas, and then update the container cache.
                   // Update the last position for next move. 
                    var erase = document.getElementById('toggle').checked;
                    wrapper.updateCache(erase ? 'destination-out' : 'source-over');
                    drawing.graphics.clear();
                });
            });
        };

    return {
        'create' : create,
        'wait' : wait,
        'unwait' : unwait
    };
});