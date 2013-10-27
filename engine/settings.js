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
                'id'  : 'image.battery.main',
                'src' : 'games/battery/images/characters/main-character.png'
            },
            {
                'id'  : 'image.battery.fatkid',
                'src' : 'games/battery/images/characters/fat-kid-character.png'
            },
            {
                'id'  : 'image.battery.nerdygirl',
                'src' : 'games/battery/images/characters/nerdy-girl-character.png'
            },
            {
                'id'  : 'image.battery.teacher',
                'src' : 'games/battery/images/characters/teacher-character.png'
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
            },
            {
                'id'  : 'image.panel.background',
                'src' : 'engine/img/panel/background.png'
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
                    'walkright'  : [1, 6, 'walkright', 0.25],
                    'walkupright'  : [1, 6, 'walkupright', 0.25],
                    'walkdownright'  : [1, 6, 'walkdownright', 0.25],
                    'walkleft'   : [9, 15, 'walkleft', 0.25],
                    'walkupleft'   : [9, 15, 'walkupleft', 0.25],
                    'walkdownleft'   : [9, 15, 'walkdownleft', 0.25],
                    'standright' : 0,
                    'standleft'  : 8,
                    'talkright'  : [16, 17, 'talkright', 0.2],
                    'talkleft'   : [16, 17, 'talkleft', 0.2],
                    'fishing'    : 18
                }
            },
            {
                'id'     : 'pc.battery.main',
                'images' : 'image.battery.main',
                'speed'  : 2,
                'textColor' : 'black',
                'frames' : {
                    'regX'   : 50,
                    'height' : 114,
                    'count'  : 88,
                    'regY'   : 0,
                    'width'  : 100
                },
                'animations' : {
                    'walkright'  : [1, 6, 'walkright', 0.25],
                    'walkupright'  : [1, 6, 'walkupright', 0.25],
                    'walkdownright'  : [1, 6, 'walkdownright', 0.25],
                    'walkleft'   : [9, 15, 'walkleft', 0.25],
                    'walkupleft'   : [9, 15, 'walkupleft', 0.25],
                    'walkdownleft'   : [9, 15, 'walkdownleft', 0.25],

                    'walkrightGoggle'  : [25, 30, 'walkrightGoggle', 0.25],
                    'walkuprightGoggle'  : [25, 30, 'walkuprightGoggle', 0.25],
                    'walkdownrightGoggle'  : [25, 30, 'walkdownrightGoggle', 0.25],
                    'walkleftGoggle'   : [33, 15, 'walkleftGoggle', 0.25],
                    'walkupleftGoggle'   : [33, 15, 'walkupleftGoggle', 0.25],
                    'walkdownleftGoggle'   : [33, 15, 'walkdownleftGoggle', 0.25],

                    'standright' : 0,
                    'standrightGoggle' : 24,
                    'standleft'  : 8,
                    'standleftGoggle'  : 32,

                    'talkright'  : [16, 17, 'talkright', 0.2],
                    'talkleft'   : [16, 17, 'talkleft', 0.2],
                    'talkrightGoggle'  : [18, 19, 'talkrightGoggle', 0.2],
                    'talkleftGoggle'   : [18, 19, 'talkleftGoggle', 0.2],
                    'talkrightLabcoat'  : [20, 21, 'talkrightGoggle', 0.2],
                    'talkleftLabcoat'   : [20, 21, 'talkleftGoggle', 0.2]
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
                    'talkleft'   : [4, 7, 'talkleft', 0.25],
                    'talkright'  : [8, 11, 'talkright', 0.25]
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
                    'standleft'  : [0, 1, 'standleft', 0.25],
                    'standright' : [0, 1, 'standright', 0.25],
                    'talkleft'   : [2, 3, 'talkleft', 0.25],
                    'talkright'  : [2, 3, 'talkright', 0.25]
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
                    'talkleft'   : [1, 2, 'talkleft', 0.25],
                    'talkright'  : [1, 2, 'talkright', 0.25]
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
                    'standleft'  : [0, 1, 'standleft', 0.25],
                    'standright' : 0,
                    'talkleft'   : [2, 3, 'talkleft', 0.25],
                    'talkright'  : [2, 3, 'talkright', 0.25]
                }
            },
            {
                'id'     : 'npc.fatkid',
                'images' : 'image.battery.fatkid',
                'speed'  : 2,
                'textColor' : 'blue',
                'frames' : {
                    'regX'   : 50,
                    'height' : 114,
                    'count'  : 6,
                    'regY'   : 0,
                    'width'  : 100
                },
                'animations' : {
                    'walkright'  : [0, 2, 'walkright', 0.25],
                    'walkupright'  : [0, 2, 'walkupright', 0.25],
                    'walkdownright'  : [0, 2, 'walkdownright', 0.25],
                    'walkleft'   : [0, 2, 'walkleft', 0.25],
                    'walkupleft'   : [0, 2, 'walkupleft', 0.25],
                    'walkdownleft'   : [0, 2, 'walkdownleft', 0.25],
                    'standright' : [0, 2, 'standright', 0.25],
                    'standleft'  : [0, 2, 'standleft', 0.25],
                    'talkright'  : [3, 5, 'talkright', 0.2],
                    'talkleft'   : [3, 5, 'talkleft', 0.2]
                }
            },
            {
                'id'     : 'npc.nerdygirl',
                'images' : 'image.battery.nerdygirl',
                'speed'  : 2,
                'textColor' : 'pink',
                'frames' : {
                    'regX'   : 50,
                    'height' : 114,
                    'count'  : 6,
                    'regY'   : 0,
                    'width'  : 100
                },
                'animations' : {
                    'walkright'  : [0, 0, 'walkright', 0.25],
                    'walkupright'  : [0, 0, 'walkupright', 0.25],
                    'walkdownright'  : [0, 0, 'walkdownright', 0.25],
                    'walkleft'   : [0, 0, 'walkleft', 0.25],
                    'walkupleft'   : [0, 0, 'walkupleft', 0.25],
                    'walkdownleft'   : [0, 0, 'walkdownleft', 0.25],
                    'standright' : [0, 0, 'standright', 0.25],
                    'standleft'  : [0, 0, 'standleft', 0.25],
                    'talkright'  : [3, 5, 'talkright', 0.2],
                    'talkleft'   : [3, 5, 'talkleft', 0.2]
                }
            },
            {
                'id'     : 'npc.teacher',
                'images' : 'image.battery.teacher',
                'speed'  : 2,
                'textColor' : 'green',
                'frames' : {
                    'regX'   : 50,
                    'height' : 114,
                    'count'  : 6,
                    'regY'   : 0,
                    'width'  : 100
                },
                'animations' : {
                    'walkright'  : [0, 2, 'walkright', 0.05],
                    'walkupright'  : [0, 2, 'walkupright', 0.05],
                    'walkdownright'  : [0, 2, 'walkdownright', 0.05],
                    'walkleft'   : [0, 2, 'walkleft', 0.05],
                    'walkupleft'   : [0, 2, 'walkupleft', 0.05],
                    'walkdownleft'   : [0, 2, 'walkdownleft', 0.05],
                    'standright' : [0, 2, 'standright', 0.05],
                    'standleft'  : [0, 2, 'standleft', 0.05],
                    'talkright'  : [3, 5, 'talkright', 0.25],
                    'talkleft'   : [3, 5, 'talkleft', 0.25]
                }
            }
        ]
    };
});