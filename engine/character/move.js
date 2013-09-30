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

    /**
     * measure distance if character would move on a certain angle
     */
    var _newPosition = function (character, scenepath, angle, normalize) {
            var newAngle,
                attitude;

            if (angle < -5 * Math.PI / 8 && angle >= -7 * Math.PI / 8) {
                newAngle = -3 * Math.PI / 4;
                attitude = 'walkdownleft';
            }
            if (angle < -3 * Math.PI / 8 && angle >= -5 * Math.PI / 8) {
                newAngle = -2 * Math.PI / 4;
                attitude = 'walkdown';
            }
            if (angle < -Math.PI / 8 && angle >= -3 * Math.PI / 8) {
                newAngle = -1 * Math.PI / 4;
                attitude = 'walkdownright';
            }
            if (angle < Math.PI / 8 && angle >= -Math.PI / 8) {
                newAngle = 0;
                attitude = 'walkright';
            }
            if (angle < 3 * Math.PI / 8 && angle >= Math.PI / 8) {
                newAngle = Math.PI / 4;
                attitude = 'walkupright';
            }
            if (angle < 5 * Math.PI / 8 && angle >= 3 * Math.PI / 8) {
                newAngle = 2 * Math.PI / 4;
                attitude = 'walkup';
            }
            if (angle < 7 * Math.PI / 8 && angle >= 5 * Math.PI / 8) {
                newAngle = 3 * Math.PI / 4;
                attitude = 'walkupleft';
            }
            if (!attitude) {
                attitude = 'walkleft';
                newAngle = Math.PI;
            }

            var angleToTest = (normalize ? newAngle : angle),
                goX = character.x + Math.cos(angleToTest) * character.speed,
                goY = character.y + Math.sin(angleToTest) * character.speed,
                deltaY = character.targetXY.y - goY,
                deltaX = character.targetXY.x - goX,
                distance = Math.sqrt(deltaY * deltaY + deltaX * deltaX);

            // check if it is out of bonds. If so, penalize distances by doubling it.
            var coords   = scenepath.globalToLocal(goX, goY);
            var mouseHit = scenepath.hitTest(coords.x, coords.y);

            if (!mouseHit) {
                distance = distance * 2;
            }

            return {
                'x' : goX,
                'y' : goY,
                'a' : attitude,
                'd' : distance
            };
        },

        _stand = function (character) {
            if (character.walkDeferred && character.walkDeferred.state() === 'pending') {
                character.walkDeferred.resolve();
            }
            return {x: 0, y: 0, a: 'stand'};
        },

        _calculateDirection = function (character, scene) {

            var scenepath = scene.getBackground().path;

            // no target? no walk.
            if (!character.targetXY) {
                return _stand(character);
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
                return _stand(character);
            }

            // best so far: stand
            var bestPositionSoFar = {
                'x' : character.x,
                'y' : character.y,
                'a' : 'stand',
                'd' : distance
            };

            // let's try same angle, chech it distance to goal is shorter.
            var sameAttitudePosition = _newPosition(character, scenepath, angle, false);
            if (sameAttitudePosition.d < bestPositionSoFar.d) {
                bestPositionSoFar = sameAttitudePosition;
            }

            // go round the quadrant in 45º bits 
            var i;
            for (i = 0; i < 8; i++) {
                var testAngle = angle + i * (Math.PI / 8);
                var testPosition = _newPosition(character, scenepath, testAngle, true);
                if (testPosition.d < bestPositionSoFar.d) {
                    bestPositionSoFar = testPosition;
                }
            }

            if (bestPositionSoFar.a !== 'stand') {
                return bestPositionSoFar;
            }
            // if we need to stand, resolve the deferred
            return _stand(character);
        },

        move = function (c, scene) {

            var d = _calculateDirection(c, scene);
            var diffX;

            if (!d) {
                return;
            }
            if (d.a !== 'stand') {

                c.character.attitude = d.a;
                // save the x diff, useful for panning the scene on the other way.
                diffX = d.x - c.x;
                c.setX(d.x);
                c.setY(d.y);
            } else {
                // if he is talking (a taking started), 
                // let it talk. Just ask it to stand when he is not standing and not tallking
                if (!c.character.isTalking()) {

                    if (c.character.isFacingLeft() && !c.character.isStandingLeft()) {
                        c.character.attitude = "standleft";
                    } else if (c.character.isFacingRight() && !c.character.isStandingRight()) {
                        c.character.attitude = "standright";
                    }
                }
                // perform the callback action, since the character reached his destination;
                if (c.walkDeferred  && c.walkDeferred.state() === 'pending') {
                    c.walkDeferred.resolve();
                }
            }

            if (scene && scene.isPlayable()) {
                // now, let's see if scene should scroll

                var sceneHasHiddenBackgroundOnRight = (
                    scene.background.mode !== 'fit' &&
                    (scene.backgroundOffset + scene.backgroundWidth > config.get('game.w'))
                );

                var sceneHasHiddenBackgroundOnLeft = (
                    scene.background.mode !== 'fit' &&
                    (scene.backgroundOffset < 0)
                );

                var isCharacterOnLeft = (c.x < (config.get('game.w') / 2)),
                    isCharacterOnRight = (c.x >= (config.get('game.w') / 2 - 50));

                if ((sceneHasHiddenBackgroundOnLeft  && isCharacterOnLeft && c.character.isWalkingLeft()) ||
                        (sceneHasHiddenBackgroundOnRight && isCharacterOnRight && c.character.isWalkingRight())) {
                    scene.backgroundOffset -= diffX;
                    scene.applyOffset();
                }
            }

            // change attitude only if it is different
            if (c.character.currentAnimation !== c.character.attitude) {
                c.character.currentAnimation = c.character.attitude;
                c.character.gotoAndPlay(c.character.attitude);
            }

            // if the scene has X conditions
            if (scene.conditions) {
                var i, condition;
                for (i in scene.conditions) {
                    condition = scene.conditions[i];
                    if (c.isPlayable && condition.ifOn &&
                            condition.ifOn.test && condition.ifOn.test === "higherThan" &&
                            c.x > condition.ifOn.x && !condition.executed) {
                        condition.doTest();
                        if (condition.persistence === 'once') {
                            condition.executed = true;
                        }
                    }
                }
            }
        };

    return {
        'move' : move
    };
});