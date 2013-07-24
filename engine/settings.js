/*global define */

/**
 * this module stores assets intrinsic to the game.
*/
define([
], function (
) {
    return {
        'images': [
            {
                'id'  : 'playableCharacter01',
                'src' : 'games/compass/img/character/guybrush2.png'
            },
            {
                'id'  : 'nonPlayableCharacter01',
                'src' : 'games/compass/img/character/pirate.png'
            },
            {
                'id'  : 'menuCogwheel01',
                'src' : 'engine/img/menu/cogwheel.png'
            },
            {
                'id'  : 'savegameNoImage01',
                'src' : 'engine/img/savegame/noimage.jpg'
            },
            {
                'id'  : 'cursor01',
                'src' : 'engine/img/cursor/crosshair.gif'
            }
        ],
        'sounds' : [
            {
                'id'  : 'sound.fall',
                'src' : 'engine/snd/fall.wav'
            },
            {
                'id'  : 'sound.laser',
                'src' : 'engine/snd/laser.aiff'
            },
            {
                'id'  : 'sound.fight',
                'src' : 'engine/snd/fight.wav'
            }
        ],
        'characters': [
            {
                'id'     : 'guybrush01',
                'images' : 'playableCharacter01',
                'speed'  : 2,
                'frames' : {
                    'regX'   : 52,
                    'height' : 150,
                    'count'  : 30,
                    'regY'   : 0,
                    'width'  : 104
                },
                'animations' : {
                    'walkright'  : [0, 5, 'walkright', 6],
                    'walkleft'   : [6, 11, 'walkleft', 6],
                    'standright' : 12,
                    'standleft'  : 13,
                    'talkright'  : [18, 22, 'talkright', 6],
                    'talkleft'   : [24, 27, 'talkleft', 6],
                }
            },
            {
                'id'     : 'pirate01',
                'images' : 'nonPlayableCharacter01',
                'frames' : {
                    'regX'   : 52,
                    'height' : 150,
                    'count'  : 12,
                    'regY'   : 0,
                    'width'  : 104
                },
                'animations' : {
                    'standleft'  : 0,
                    'standright' : 1,
                    'talkleft'   : [4, 7, 'talkleft', 6],
                    'talkright'  : [8, 11, 'talkright', 6]
                }
            }
        ]
    };
});