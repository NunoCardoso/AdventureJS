/*global define, createjs, $ */

/**
 * This module handles the playable character
 */
define([
    'advgame/gamestage',
    'advgame/gameprops'
], function (gamestage, gameprops) {

    var pc,

        prepare = function (opc, queue) {

            pc = new createjs.BitmapAnimation(
                new createjs.SpriteSheet({
                    images: [queue.getResult(opc.images)],
                    frames: opc.frames,
                    animations: opc.animations
                })
            );
            pc.x = 0;
            pc.y = 230;
            pc.speed = 2;
            pc.attitude = 'standright';
            pc.gotoAndPlay(pc.attitude);

            // this is not a BitmapAnimation function, it is a AdvGame custom function;
            pc.updatePosition = function (clickedX, clickedY) {
                // attitudes
                if (pc.x > clickedX && (pc.x - clickedX > pc.speed)) {
                    pc.attitude = "walkleft";
                } else if (pc.x < clickedX  && (clickedX - pc.x > pc.speed)) {
                    pc.attitude = "walkright";
                } else {
                    if (pc.attitude === "walkleft") {
                        pc.attitude = "standleft";
                    } else if (pc.attitude === "walkright") {
                        pc.attitude = "standright";
                    }
                }
                if (pc.attitude === "walkleft") {
                    pc.x -= pc.speed;
                } else if (pc.attitude === "walkright") {
                    pc.x += pc.speed;
                }

                // change attitude only if it is different
                if (pc.currentAnimation !== pc.attitude) {
                    pc.gotoAndPlay(pc.attitude);
                }
            };

            gameprops.set('pc', pc);
        },

        render = function () {
            pc = gameprops.get('pc');
            var pcContainer = new createjs.Container();
            pcContainer.addChild(
                pc
            );
            gamestage.addChild(pcContainer);
        };

    return {
        'prepare' : prepare,
        'render'  : render
    };
});
