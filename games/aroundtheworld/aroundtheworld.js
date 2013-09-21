/*global define */

define([
], function () {
    return {
        'images': [
            {
                'id'  : 'image.aroundtheworld',
                'src' : 'games/aroundtheworld/img/background/around-the-world.jpg'
            },
            {
                'id'  : 'image.japan',
                'src' : 'games/aroundtheworld/img/background/japan.jpg'
            },
            {
                'id'  : 'image.japan.path',
                'src' : 'games/aroundtheworld/img/background/japan.path.png'
            },
            {
                'id'  : 'image.all.path',
                'src' : 'games/aroundtheworld/img/background/all.path.png'
            },
            {
                'id'  : 'image.object.straws',
                'src' : 'games/aroundtheworld/img/object/cornfieldstraws.png'
            }
        ],
        'sounds' : [],
        'musics' : [],
        'pc' : {
            'id'    : 'pc.main',
            'label' : 'you'
        },
        'npcs' : [
            {
                'id'    : 'npc.bowser',
                'label' : 'Bowser'
            }
        ],
        'main': {
            'title'         : '',
            'author'        : 'John Teacher',
            'description'   : 'Do you really know Japan history? Do you really know how was France in the XVIII century? Well, buckle up, let’s blast to the past and have fun!',
            'background'    : 'image.aroundtheworld',
            'startingScene' : 'scene.01',
            'music'         : 'music.intro'
        },
        'panel' : {
            'startingInventory' : [
            ],
            'verbs' : [
                {'first': 'Give',    'nr' : 2, 'second': 'to'},
                {'first': 'Use',     'nr' : 2, 'second': 'with'},
                {'first': 'Pick up', 'nr' : 1},
                {'first': 'Open',    'nr' : 1},
                {'first': 'Push',    'nr' : 1},
                {'first': 'Look at', 'nr' : 1},
                {'first': 'Close',   'nr' : 1},
                {'first': 'Pull',    'nr' : 1},
                {'first': 'Talk to', 'nr' : 1}
            ]
        },
        'objects': [
            {
                'id': 'object.straws',
                'label': 'straws',
                'imageInStage' : 'image.object.straws',
                'onForeground' : true
            }
        ],
        'interactions': [
        ],
        'scenes': [
            {
                'id'                 : 'scene.01',
                'background'         : 'image.japan',
                'backgroundpath'     : 'image.japan.path',
                'backgroundmode'     : 'overflow',
                'description'        : 'This is the first scene.',
                'interactable'       : true,
                'npcs' : [
                    {
                        'id' : 'npc.bowser',
                        'position' : {
                            'x'    : 1350,
                            'y'    : 370
                        }

                    }
                ],
                'objects' : [
                    {
                        'id' : 'object.straws',
                        'x'  : 300,
                        'y'  : 200,
                        'w'  : 195,
                        'h'  : 240
                    }
                ],
                'exits' : [
                    {
                        'exit' : 'exit.01',
                        'label' : 'begin',
                        'x' : 0,
                        'y' : 190,
                        'w' : 100,
                        'h' : 200
                    },
                    {
                        'exit' : 'exit.02',
                        'label' : 'France',
                        'x' : 2000,
                        'y' : 200,
                        'w' : 50,
                        'h' : 200,
                        'arrow' : 'right'
                    }
                ]
            }
        ],
        'exits' : [
            {
                'id'   : 'exit.01',
                'role' : 'begin'
            },
            {
                'id'   : 'exit.02',
                'role' : 'channel',
                'to'   : 'exit.03'
            }
        ],
        'conditions' : [
        ],
        'dialogs' : [
        ],
        'dialogoptions' : [
        ],
        'achievements': [
            {
                'id' : 'achievement.gameover',
                'title' : 'You finished the game!'
            }
        ]
    };
});