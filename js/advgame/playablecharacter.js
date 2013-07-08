/*global define, createjs, $ */

/**
 * This module handles the playable character
 */
define([
    'advgame/gamestage',
    'advgame/gameprops'
], function (gamestage, gameprops) {

    var pc = [],

        prepare = function (characters, queue) {
            var i, c, _c;
            for (i = 0; i < characters.length; i++) {
                c = characters[i];
                _c = new createjs.BitmapAnimation(
                    new createjs.SpriteSheet({
                        images: [queue.getResult(c.images)],
                        frames: c.frames,
                        animations: c.animations
                    })
                );
                _c.x = 0;
                _c.y = 230;
                _c.speed = c.speed;
                _c.attitude = 'standright';
                _c.gotoAndPlay(_c.attitude);

                if (c.playable) {
                    // this is not a BitmapAnimation function, it is a AdvGame custom function;
                    _c.updatePosition = function (mouse) {
                        // attitudes
                        if (_c.x > mouse.x && (_c.x - mouse.x > _c.speed)) {
                            _c.attitude = "walkleft";
                        } else if (_c.x < mouse.x  && (mouse.x - _c.x > _c.speed)) {
                            _c.attitude = "walkright";
                        } else {
                            if (_c.attitude === "walkleft") {
                                _c.attitude = "standleft";
                            } else if (_c.attitude === "walkright") {
                                _c.attitude = "standright";
                            }
                        }
                        if (_c.attitude === "walkleft") {
                            _c.x -= _c.speed;
                        } else if (_c.attitude === "walkright") {
                            _c.x += _c.speed;
                        }

                        // change attitude only if it is different
                        if (_c.currentAnimation !== _c.attitude) {
                            _c.gotoAndPlay(_c.attitude);
                        }
                    };
                }
                pc[i] = _c;
            }
            gameprops.set('characters', pc);
        },

        render = function () {
            var pcContainer,
                i,
                characters = gameprops.get('characters');

            pcContainer = new createjs.Container();
            for (i = 0; i < characters.length; i++) {
                pcContainer.addChild(characters[i]);
            }
            gamestage.addChild(pcContainer);
        };

    return {
        'prepare' : prepare,
        'render'  : render
    };
});
