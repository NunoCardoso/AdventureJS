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
                'id'  : 'image.girl',
                'src' : 'games/aroundtheworld/img/character/little-girl.png'
            },
            {
                'id'  : 'image.bowser',
                'src' : 'games/aroundtheworld/img/character/bowser.png'
            },
            {
                'id'  : 'image.togatsu',
                'src' : 'games/aroundtheworld/img/character/togatsu-san.png'
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
                'id'  : 'image.cursor.target',
                'src' : 'engine/img/cursor/target.png'
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
                'src' : 'engine/sound/fall.wav'
            },
            {
                'id'  : 'sound.laser',
                'src' : 'engine/sound/laser.aiff'
            },
            {
                'id'  : 'sound.fight',
                'src' : 'engine/sound/fight.wav'
            }
        ],
        'musics' : [],
        'characters': [
            {
                'id'     : 'pc.main',
                'images' : 'image.main',
                'speed'  : 2,
                'textColor' : 'black',
                'frames' : {
                    'regX'   : 50,
                    'height' : 114,
                    'count'  : 20,
                    'regY'   : 0,
                    'width'  : 100
                },
                'animations' : {
                    'walkright'  : [1, 6, 'walkright', 7],
                    'walkupright'  : [1, 6, 'walkupright', 7],
                    'walkdownright'  : [1, 6, 'walkdownright', 7],
                    'walkleft'   : [9, 15, 'walkleft', 7],
                    'walkupleft'   : [9, 15, 'walkupleft', 7],
                    'walkdownleft'   : [9, 15, 'walkdownleft', 7],
                    'standright' : 0,
                    'standleft'  : 8,
                    'talkright'  : [16, 17, 'talkright', 5],
                    'talkleft'   : [16, 17, 'talkleft', 5]
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
                'id'     : 'npc.girl',
                'images' : 'image.girl',
                'textColor' : 'green',
                'speed'  : 2,
                'frames' : {
                    'regX'   : 50,
                    'height' : 114,
                    'count'  : 8,
                    'regY'   : 0,
                    'width'  : 100
                },
                'animations' : {
                    'standleft'  : [0, 1, 'standleft', 6],
                    'standright' : [0, 1, 'standright', 6],
                    'talkleft'   : [2, 3, 'talkleft', 6],
                    'talkright'  : [2, 3, 'talkright', 6]
                }
            },
            {
                'id'        : 'npc.togatsu',
                'images'    : 'image.togatsu',
                'textColor' : 'green',
                'speed'  : 2,
                'frames' : {
                    'regX'   : 104,
                    'height' : 194,
                    'count'  : 3,
                    'regY'   : 0,
                    'width'  : 208
                },
                'animations' : {
                    'standleft'  : 0,
                    'standright' : 0,
                    'talkleft'   : [1, 2, 'talkleft', 6],
                    'talkright'  : [1, 2, 'talkright', 6]
                }
            },
            {
                'id'     : 'npc.tatsu',
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
                    'standleft'  : [0, 1, 'standleft', 6],
                    'standright' : 0,
                    'talkleft'   : [2, 3, 'talkleft', 6],
                    'talkright'  : [2, 3, 'talkright', 6]
                }
            }
        ]
    };
});