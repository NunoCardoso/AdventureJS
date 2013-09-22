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

        /** just calculate next direction, and give the next step coordinates 
          * it scans all allowable direction 
          */
        _nextDirection = function (character, angle, tries, scenepath) {
            var goX = character.x + Math.cos(angle) * character.speed,
                goY = character.y + Math.sin(angle) * character.speed;

            var coords   = scenepath.globalToLocal(goX, goY);
            var mouseHit = scenepath.hitTest(coords.x, coords.y);

            if (mouseHit) {
                return {
                    x : character.speed * Math.cos(angle),
                    y : character.speed * Math.sin(angle),
                    d : _getAttitude(angle)
                };
            }
            if (tries < 2) {
                //c.targetXY = undefined;
                if (character.walkDeferred) {
                    character.walkDeferred.resolve();
                    character.walkDeferred = undefined;
                }
                return {x: 0, y: 0, d: 'stand'};
            }
            // recursive, if not within allowed place.
            angle = -1 * (angle + Math.PI / 8);
            tries++;
            return _nextDirection(character, angle, tries, scenepath);
        },

        _calculateDirection = function (character, scene) {
            var scenepath = scene.getBackground().path;
            // no target? no walk.
            if (!character.targetXY) {
                if (character.walkDeferred) {
                    character.walkDeferred.resolve();
                    character.walkDeferred = undefined;
                }
                return {x: 0, y: 0, d: 'stand'};
            }

            var deltaY = character.targetXY.y - character.y,
                deltaX = character.targetXY.x - character.x,
                distance = Math.sqrt(deltaY * deltaY + deltaX * deltaX),
                angle = Math.atan(deltaY / deltaX);

            // fix angle.
            if (deltaX < 0) {
                angle = angle + Math.PI;
            }

            // set threshold to stop walk.
            if (distance < 2) {
                if (character.walkDeferred) {
                    character.walkDeferred.resolve();
                    character.walkDeferred = undefined;
                }
                return {x: 0, y: 0, d: 'stand'};
            }

            // fazer isto recursivo;
            return _nextDirection(character, angle, 0, scenepath);
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
                if (c.character.isFacingLeft() && !c.character.isStandingLeft()) {
                    c.character.attitude = "standleft";
                    // perform the callback action, since the character reached his destination;
                    if (c.walkDeferred) {
                        c.walkDeferred.resolve();
                        c.walkDeferred = undefined;
                    }
                } else if (c.character.isFacingRight() && !c.character.isStandingRight()) {
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
            if (c.character.currentAnimation !== c.character.attitude) {
                c.character.currentAnimation = c.character.attitude;
                c.character.gotoAndPlay(c.character.attitude);
            }
        };

    return {
        'move' : move
    };
});