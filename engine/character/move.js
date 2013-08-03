/*global define */

define([
    'engine/config'
], function (
    config
) {

    /**
     * heuristic: get the bearing between pc and targetXY.
     * try straignt line. if not, try the 8 main bearings clockwise. 
     * when one hits valid area, use it.
     */

    var _getAttitude = function (angle) {
            if (angle < -5 * Math.PI / 8 && angle >= -7 * Math.PI / 8) {
                return 'walkdownleft';
            }
            if (angle < -3 * Math.PI / 8 && angle >= -5 * Math.PI / 8) {
                return 'walkdown';
            }
            if (angle < -Math.PI / 8 && angle >= -3 * Math.PI / 8) {
                return 'walkdownright';
            }
            if (angle < Math.PI / 8 && angle >= -Math.PI / 8) {
                return 'walkright';
            }
            if (angle < 3 * Math.PI / 8 && angle >= Math.PI / 8) {
                return 'walkupright';
            }
            if (angle < 5 * Math.PI / 8 && angle >= 3 * Math.PI / 8) {
                return 'walkup';
            }
            if (angle < 7 * Math.PI / 8 && angle >= 5 * Math.PI / 8) {
                return 'walkupleft';
            }
            return 'walkleft';
        },

        _nextDirection = function (c, angle, tries, scenepath) {
            var goX = c.x + Math.cos(angle) * c.speed,
                goY = c.y + Math.sin(angle) * c.speed;

            var coords = scenepath.globalToLocal(goX, goY);
            var mouseHit = scenepath.hitTest(coords.x, coords.y);

            if (mouseHit) {
                return {
                    x : c.speed * Math.cos(angle),
                    y : c.speed * Math.sin(angle),
                    d : _getAttitude(angle)
                };
            }
            if (tries > 16) {
                //c.targetXY = undefined;
                return {x: 0, y: 0, d: 'stand'};
            }
            // recursive, if not within allowed place.

            angle = -1 * (angle + Math.PI / 8);
            tries++;
            return _nextDirection(c, angle, tries, scenepath);
        },

        _calculateDirection = function (c, scene) {
            var scenepath = scene.getBackground().path;
            if (!c.targetXY) {
                return {x: 0, y: 0, d: 'stand'};
            }

            var deltaY = c.targetXY.y - c.y,
                deltaX = c.targetXY.x - c.x,
                abs = Math.sqrt(deltaY * deltaY + deltaX * deltaX),
                slope = deltaY / deltaX,
                angle = Math.atan(slope);

            if (deltaX < 0) {
                angle = angle + Math.PI;
            }

            if (abs < 1) {
               // c.targetXY = undefined;
                return {x: 0, y: 0, d: 'stand'};
            }

            // fazer isto recursivo;
            return _nextDirection(c, angle, 0, scenepath);
        },

        move = function (c, scene) {

            var d = _calculateDirection(c, scene);
            if (!d) {
                return;
            }
            if (d.d !== 'stand') {
                c.character.attitude = d.d;
                c.setX(c.x + d.x);
                c.setY(c.y + d.y);
            } else {
                if (c.isFacingLeft() && !c.isStandingLeft()) {
                    c.character.attitude = "standleft";
                    // perform the callback action, since the character reached his destination;
                    if (c.walkDeferred) {
                        c.walkDeferred.resolve();
                        c.walkDeferred = undefined;
                    }
                } else if (c.isFacingRight() && !c.isStandingRight()) {
                    c.character.attitude = "standright";
                    // perform the callback action, since the character reached his destination;
                    if (c.walkDeferred) {
                        c.walkDeferred.resolve();
                        c.walkDeferred = undefined;
                    }
                }
            }

            if (scene && scene.isPlayable()) {
                // now, let's see if scene should scroll
                var sceneHasHiddenBackgroundOnRight = (
                    scene.background.mode !== 'fit' &&
                    (scene.dynamicBack.x + scene.dynamicBack.w > config.get('game.w'))
                );

                var sceneHasHiddenBackgroundOnLeft = (
                    scene.background.mode !== 'fit' &&
                    (scene.dynamicBack.x < 0)
                );

                var isCharacterOnLeftHalf = (c.x < (config.get('game.w') / 2));
                var isCharacterOnRightHalf = (c.x >= (config.get('game.w') / 2));

                if ((sceneHasHiddenBackgroundOnLeft  && isCharacterOnLeftHalf  && c.character.attitude === 'walkleft') ||
                        (sceneHasHiddenBackgroundOnRight && isCharacterOnRightHalf && c.character.attitude === 'walkright')) {
                    scene.dynamicBack.x -= d.x;
                    scene.dynamicFore.x -= d.x;
                    // restore character into that position
                    c.setX(c.x - d.x);
                    if (c.targetXY) {
                        // nonetheless, your targetXY comes closer
                        c.targetXY.x -= d.x;
                    }
                }
            }
            // change attitude only if it is different
            if (c.currentAnimation !== c.character.attitude) {
                c.currentAnimation = c.character.attitude;
                c.character.gotoAndPlay(c.character.attitude);
            }
        };

    return {
        'move' : move
    };
});