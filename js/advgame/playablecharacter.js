/*global define, createjs, $ */

/**
 * This module handles the playable character
 */
define([
    'advgame/gameconfig',
    'advgame/images',
    'advgame/gamestage',
    'advgame/gameconsole'
], function (gameconfig, images, gamestage, gameconsole) {

    var pc,

        _prepare = function (characters) {
            pc = [];
            var i, c, _c;
            for (i = 0; i < characters.length; i++) {
                c = characters[i];
                _c = new createjs.BitmapAnimation(
                    new createjs.SpriteSheet({
                        images: [images.getQueueLoaded().getResult(c.images)],
                        frames: c.frames,
                        animations: c.animations
                    })
                );
                _c.x = 0;
                _c.y = 230;
                _c.name = c.name;
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
        },

        onCharacterMouseOver = function (e) {
            console.log("character mouse over");
            gameconsole.get().action.text = 'Look at ' + e.target.name;
        },

        onCharacterMouseOut = function (e) {
            console.log("character mouse out");
            gameconsole.get().action.text = gameconfig.get('console.action.defaultText');
        },

        render = function (characters) {
            var pcContainer = new createjs.Container(),
                i;

            pcContainer.name = 'pcContainer';
            _prepare(characters);

            for (i = 0; i < pc.length; i++) {
                pcContainer.addChild(pc[i]);
                pc[i].addEventListener("mouseover", $.proxy(onCharacterMouseOver, this));
                pc[i].addEventListener("mouseout", $.proxy(onCharacterMouseOut, this));
            }
            gamestage.addChild(pcContainer);

        };

    return {
        'render'  : render
    };
});
