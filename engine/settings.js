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
                'id'  : 'image.guybrush',
                'src' : 'games/compass/img/character/guybrush2.png'
            },
            {
                'id'  : 'image.pirate',
                'src' : 'games/compass/img/character/pirate.png'
            },
            {
                'id'  : 'image.menu.cogwheel',
                'src' : 'engine/img/menu/cogwheel.png'
            },
            {
                'id'  : 'image.savegame.noimage',
                'src' : 'engine/img/savegame/noimage.jpg'
            },
            {
                'id'  : 'image.cursor.default',
                'src' : 'engine/img/cursor/crosshair.gif'
            },
            {
                'id'  : 'image.cursor.left',
                'src' : 'engine/img/cursor/left.png'
            },
            {
                'id'  : 'image.cursor.right',
                'src' : 'engine/img/cursor/right.png'
            },
            {
                'id'  : 'image.cursor.end',
                'src' : 'engine/img/cursor/end.png'
            },
            {
                'id'  : 'image.cursor.drag',
                'src' : 'engine/img/cursor/drag.png'
            },
            {
                'id'  : 'image.cursor.wait',
                'src' : 'engine/img/cursor/wait.png'
            },
            {
                'id'  : 'image.panel.arrowup',
                'src' : 'engine/img/panel/uparrow.png'
            },
            {
                'id'  : 'image.panel.arrowdown',
                'src' : 'engine/img/panel/downarrow.png'
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
                'id'     : 'pc.guybrush',
                'images' : 'image.guybrush',
                'speed'  : 2,
                'textColor' : 'black',
                'frames' : {
                    'regX'   : 52,
                    'height' : 150,
                    'count'  : 30,
                    'regY'   : 0,
                    'width'  : 104
                },
                'animations' : {
                    'walkright'  : [0, 5, 'walkright', 6],
                    'walkupright'  : [0, 5, 'walkupright', 6],
                    'walkdownright'  : [0, 5, 'walkdownright', 6],
                    'walkleft'   : [6, 11, 'walkleft', 6],
                    'walkupleft'   : [6, 11, 'walkupleft', 6],
                    'walkdownleft'   : [6, 11, 'walkdownleft', 6],
                    'standright' : 12,
                    'standleft'  : 13,
                    'talkright'  : [18, 22, 'talkright', 6],
                    'talkleft'   : [24, 27, 'talkleft', 6]
                }
            },
            {
                'id'     : 'npc.pirate01',
                'images' : 'image.pirate',
                'textColor' : 'red',
                'speed'  : 2,
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