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
                'id'  : 'image.main',
                'src' : 'games/aroundtheworld/img/character/main.png'
            },
            {
                'id'  : 'image.pirate',
                'src' : 'games/compass/img/character/pirate.png'
            },
            {
                'id' : 'image.bowser',
                'src': 'games/aroundtheworld/img/character/bowser.png'
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
                'id'     : 'pc.main',
                'images' : 'image.main',
                'speed'  : 2,
                'textColor' : 'black',
                'frames' : {
                    'regX'   : 57,
                    'height' : 114,
                    'count'  : 20,
                    'regY'   : 0,
                    'width'  : 100
                },
                'animations' : {
                    'walkright'  : [1, 6, 'walkright', 9],
                    'walkupright'  : [1, 6, 'walkupright', 9],
                    'walkdownright'  : [1, 6, 'walkdownright', 9],
                    'walkleft'   : [9, 15, 'walkleft', 9],
                    'walkupleft'   : [9, 15, 'walkupleft', 9],
                    'walkdownleft'   : [9, 15, 'walkdownleft', 9],
                    'standright' : 0,
                    'standleft'  : 8,
                    'talkright'  : [16, 17, 'talkright', 16],
                    'talkleft'   : [16, 17, 'talkleft', 16]
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
            },
            {
                'id'     : 'npc.bowser',
                'images' : 'image.bowser',
                'textColor' : 'blue',
                'speed'  : 2,
                'frames' : {
                    'regX'   : 52,
                    'height' : 194,
                    'count'  : 4,
                    'regY'   : 0,
                    'width'  : 208
                },
                'animations' : {
                    'standleft'  : [0, 1, 'talkleft', 0],
                    'standright' : 0,
                    'talkleft'   : [2, 3, 'talkleft', 2],
                    'talkleft'   : [2, 3, 'talkleft', 2]
                }
            }
        ]
    };
});