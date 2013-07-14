/*global define, createjs, $ */

/**
 * This module handles the playable character
 */
define([
    'engine/gameconfig',
    'engine/assets',
    'engine/gamestage',
    'engine/console/main'
], function (gameconfig, assets, gamestage, gameconsole) {

    var pc,

        _prepare = function (c) {
            pc = new createjs.BitmapAnimation(
                new createjs.SpriteSheet({
                    images: [assets.getQueueLoaded().getResult(c.images)],
                    frames: c.frames,
                    animations: c.animations
                })
            );
            pc.x = 0;
            pc.y = 0;
            pc.clickedXY = null;
            pc.name = c.name;
            pc.speed = c.speed;
            pc.attitude = 'standright';
            pc.gotoAndPlay(pc.attitude);

            pc.setClickedXY = function (xy) {
                pc.clickedXY = xy;
            };

            pc.updatePosition = function () {
                // attitudes
                if (pc.clickedXY) {
                    if (pc.x > pc.clickedXY.x && (pc.x - pc.clickedXY.x > pc.speed)) {
                        pc.attitude = "walkleft";
                    } else if (pc.x < pc.clickedXY.x  && (pc.clickedXY.x - pc.x > pc.speed)) {
                        pc.attitude = "walkright";
                    } else {
                        if (pc.attitude === "walkleft") {
                            pc.attitude = "standleft";
                        } else if (pc.attitude === "walkright") {
                            pc.attitude = "standright";
                        }
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
        },

        onCharacterMouseOver = function (e) {
            console.log("character mouse over");
            gameconsole.get().sentence.text = gameconsole.get().sentence.lockedVerb.text + ' ' + e.target.name;
        },

        onCharacterMouseOut = function (e) {
            console.log("character mouse out");
            gameconsole.get().sentence.text = gameconfig.get('console.sentence.defaultText');
        },

        render = function (character) {
            _prepare(character);
            pc.addEventListener("mouseover", $.proxy(onCharacterMouseOver, this));
            pc.addEventListener("mouseout", $.proxy(onCharacterMouseOut, this));
            return pc;
        };

    return {
        'render'  : render
    };
});
