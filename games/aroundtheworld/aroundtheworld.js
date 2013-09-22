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
            },
            {
                'id'  : 'image.object.clothesline',
                'src' : 'games/aroundtheworld/img/object/clothesline.png'
            },
            {
                'id'  : 'image.object.whitetowel',
                'src' : 'games/aroundtheworld/img/object/whitetowel.png'
            },
            {
                'id'  : 'image.object.shirt',
                'src' : 'games/aroundtheworld/img/object/shirt.png'
            },
            {
                'id'  : 'image.object.inventory.whitetowel',
                'src' : 'games/aroundtheworld/img/object/inventorywhitetowel.png'
            },
            {
                'id'  : 'image.object.inventory.shirt',
                'src' : 'games/aroundtheworld/img/object/inventoryshirt.png'
            },
            {
                'id'  : 'image.object.inventory.redberry',
                'src' : 'games/aroundtheworld/img/object/inventorytomato.png'
            },
            {
                'id'  : 'image.object.inventory.towelwithredberry',
                'src' : 'games/aroundtheworld/img/object/inventorytowelwithtomato.png'
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
            },
            {
                'id': 'object.clothesline',
                'label': 'clothesline',
                'imageInStage' : 'image.object.clothesline',
                'onForeground' : false
            },
            {
                'id': 'object.whitetowel',
                'label': 'white towel',
                'imageInStage' : 'image.object.whitetowel',
                'imageInInventory' : 'image.object.inventory.whitetowel',
                'onForeground' : false
            },
            {
                'id': 'object.shirt',
                'label': 'shirt',
                'imageInStage' : 'image.object.shirt',
                'imageInInventory' : 'image.object.inventory.shirt',
                'onForeground' : false
            },
            {
                'id': 'object.redberry',
                'label': 'red berry',
                'imageInInventory' : 'image.object.inventory.redberry',
                'onForeground' : false
            },
            {
                'id': 'object.towelwithredberry',
                'label': 'towel with red berry',
                'imageInInventory' : 'image.object.inventory.towelwithredberry',
                'onForeground' : false
            }
        ],
        'interactions': [
            {
                'id' : 'interaction.01',
                'verb' : 'Look at',
                'first': {
                    'item' : 'object.straws',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'Cool, straws. Now I need a drink.'
                    }
                ]
            },
            {
                'id' : 'interaction.02',
                'verb' : 'Pick up',
                'first': {
                    'item' : 'object.straws',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'addToInventory',
                        'object': 'object.redberry'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'I\'ll just take one red berry.'
                    },
                    {
                        'action': 'publishAchievement',
                        'achievement' : 'achievement.redberry'
                    }
                ]
            },
            {
                'id' : 'interaction.03',
                'verb' : 'Look at',
                'first': {
                    'item' : 'object.clothesline',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'Someone is drying their clothes.'
                    }
                ]
            },
            {
                'id' : 'interaction.04',
                'verb' : 'Pick up',
                'first': {
                    'item' : 'object.clothesline',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'Nah. I don\'t do laundry. I\'m virtual, baby!'
                    }
                ]
            },
            {
                'id' : 'interaction.05',
                'verb' : 'Look at',
                'first': {
                    'item' : 'object.shirt',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'It\'s a blue, white and red shirt. Reminds me of something...'
                    }
                ]
            },
            {
                'id' : 'interaction.06',
                'verb' : 'Pick up',
                'first': {
                    'item' : 'object.shirt',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'fromSceneToInventory',
                        'object': 'object.shirt'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'XS. Not my size. And not my style, also.'
                    },
                    {
                        'action': 'publishAchievement',
                        'achievement' : 'achievement.clothes'
                    }
                ]
            },
            {
                'id' : 'interaction.07',
                'verb' : 'Look at',
                'first': {
                    'item' : 'object.whitetowel',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'it\'s a small table towel.'
                    }
                ]
            },
            {
                'id' : 'interaction.08',
                'verb' : 'Pick up',
                'first': {
                    'item' : 'object.whitetowel',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'fromSceneToInventory',
                        'object': 'object.whitetowel'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'Picnic time!'
                    },
                    {
                        'action': 'publishAchievement',
                        'achievement' : 'achievement.clothes'
                    }
                ]
            },
            {
                'id' : 'interaction.09',
                'verb' : 'Use',
                'first': {
                    'item' : 'object.whitetowel',
                    'inInventory' : true
                },
                'second' : {
                    'item' : 'object.redberry',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'removeFromInventory',
                        'object': 'object.whitetowel'
                    },
                    {
                        'action': 'removeFromInventory',
                        'object': 'object.redberry'
                    },
                    {
                        'action': 'addToInventory',
                        'object': 'object.towelwithredberry'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'There, the berry is squashed.'
                    },
                    {
                        'action': 'publishAchievement',
                        'achievement' : 'achievement.squash'
                    }
                ]
            }
        ],
        'scenes': [
            {
                'id'                 : 'scene.01',
                'background'         : 'image.japan',
                'backgroundpath'     : 'image.japan.path',
                'backgroundmode'     : 'overflow',
                'description'        : 'This is the first scene.',
                'interactable'       : true,
                'music'              : 'music.scene.01',
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
                        'x'  : 250,
                        'y'  : 200,
                        'w'  : 195,
                        'h'  : 240
                    },
                    {
                        'id' : 'object.clothesline',
                        'x'  : 430,
                        'y'  : 210,
                        'w'  : 338,
                        'h'  : 145
                    },
                    {
                        'id' : 'object.shirt',
                        'x'  : 542,
                        'y'  : 243,
                        'w'  : 68,
                        'h'  : 76
                    },
                    {
                        'id' : 'object.whitetowel',
                        'x'  : 660,
                        'y'  : 230,
                        'w'  : 68,
                        'h'  : 76
                    }
                ],
                'exits' : [
                    {
                        'exit' : 'exit.01',
                        'label' : 'begin',
                        'x' : 50,
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
                'id' : 'achievement.redberry',
                'title' : 'You got a red berry!'
            },
            {
                'id' : 'achievement.clothes',
                'title' : 'You shamelessly stole clothes!'
            },
            {
                'id' : 'achievement.squash',
                'title' : 'You ruined a good towel!'
            },
            {
                'id' : 'achievement.gameover',
                'title' : 'You finished the game!'
            }
        ]
    };
});