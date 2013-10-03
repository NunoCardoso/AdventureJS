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
                'id'  : 'image.japannewyear',
                'src' : 'games/aroundtheworld/img/background/japan-newyear.png'
            },
            {
                'id'  : 'image.backyard',
                'src' : 'games/aroundtheworld/img/background/backyard.png'
            },
            {
                'id'  : 'image.backyard.path',
                'src' : 'games/aroundtheworld/img/background/all.path.png'
            },
            {
                'id'  : 'image.spin',
                'src' : 'games/aroundtheworld/img/background/spin.png'
            },
            {
                'id'  : 'image.japan.path',
                'src' : 'games/aroundtheworld/img/background/japan.path2.png'
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
                'id'  : 'image.object.amulet',
                'src' : 'games/aroundtheworld/img/object/amulet.png'
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
            },
            {
                'id'  : 'image.object.inventory.amulet',
                'src' : 'games/aroundtheworld/img/object/inventoryamulet.png'
            },
            {
                'id'  : 'image.object.inventory.fishingpole',
                'src' : 'games/aroundtheworld/img/object/inventoryfishingpole.png'
            },
            {
                'id'  : 'image.object.1x1',
                'src' : 'games/aroundtheworld/img/object/1x1.png'
            },
            {
                'id'  : 'image.object.inventory.fish',
                'src' : 'games/aroundtheworld/img/object/inventoryfish.png'
            },
            {
                'id'  : 'image.object.inventory.rice',
                'src' : 'games/aroundtheworld/img/object/inventoryrice.png'
            }
        ],
        'sounds' : [],
        'musics' : [
            {
                'id'  : 'music.intro',
                'src' : 'games/aroundtheworld/msc/game-scene01.wav'
            },
            {
                'id'  : 'music.backyard',
                'src' : 'games/aroundtheworld/msc/chinese_juggler.mp3'
            },
            {
                'id'  : 'music.japan',
                'src' : 'games/aroundtheworld/msc/chinflow.mp3'
            }
        ],
        'pc' : {
            'id'    : 'pc.main',
            'label' : 'you'
        },
        'npcs' : [
            {
                'id'    : 'npc.tatsu',
                'label' : 'Tatsu'
            },
            {
                'id'    : 'npc.girl',
                'label' : 'little girl'
            },
            {
                'id'    : 'npc.togatsu',
                'label' : 'Togatsu'
            }
        ],
        'main': {
            'title'         : '',
            'author'        : 'John Teacher',
            'description'   : 'Do you really know Japan history? Do you really know how was France in the XVIII century? Well, buckle up, let’s blast to the past and have fun!',
            'background'    : 'image.aroundtheworld',
            'startingScene' : 'scene.japan',
            'music'         : 'music.intro'
        },
        'panel' : {
            'startingInventory' : [
                'object.fish'
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
                'id': 'object.amulet',
                'label': 'amulet',
                'imageInStage' : 'image.object.amulet',
                'imageInInventory' : 'image.object.inventory.amulet',
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
            },
            {
                'id': 'object.fishingpole',
                'label': 'fishing pole',
                'imageInInventory' : 'image.object.inventory.fishingpole',
                'onForeground' : false
            },
            {
                'id': 'object.lake',
                'label': 'lake',
                'imageInStage' : 'image.object.1x1',
                'onForeground' : false
            },
            {
                'id': 'object.fish',
                'label': 'fish',
                'imageInInventory' : 'image.object.inventory.fish',
                'onForeground' : false
            },
            {
                'id': 'object.rice',
                'label': 'bag of rice',
                'imageInInventory' : 'image.object.inventory.rice',
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
            },
            {
                'id' : 'interaction.10',
                'verb' : 'Talk to',
                'first' : {
                    'item' : 'npc.tatsu'
                },
                'actions' : [
                    {
                        'action': 'playDialog',
                        'dialog': 'dialog.talkToTatsu'
                    }
                ]
            },
            {
                'id' : 'interaction.11',
                'verb' : 'Give',
                'first' : {
                    'item' : 'object.shirt'
                },
                'second' : {
                    'item' : 'npc.tatsu'
                },
                'actions' : [
                    {
                        'action': 'playDialog',
                        'dialog': 'dialog.giveshirtToTatsu'
                    }
                ]
            },
            {
                'id' : 'interaction.12',
                'verb' : 'Give',
                'first' : {
                    'item' : 'object.towelwithredberry'
                },
                'second' : {
                    'item' : 'npc.tatsu'
                },
                'actions' : [
                    {
                        'action': 'playDialog',
                        'dialog': 'dialog.giveTowelWithRedBerryToTatsu'
                    }
                ]
            },
            {
                'id' : 'interaction.13',
                'verb' : 'Look at',
                'first': {
                    'item' : 'object.amulet',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'What is this? Looks like an amulet.'
                    }
                ]
            },
            {
                'id' : 'interaction.13.5',
                'verb' : 'Look at',
                'first': {
                    'item' : 'object.amulet',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'It\'s the amulet I picked up on the backyard.'
                    }
                ]
            },
            {
                'id' : 'interaction.14',
                'verb' : 'Pick up',
                'first': {
                    'item' : 'object.amulet',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action' : 'setBusyIcon'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'What is this thing doing here?'
                    },
                    {
                        'action': 'wait',
                        'howmuch': 2000
                    },
                    {
                        'action': 'fromSceneToInventory',
                        'object': 'object.amulet'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'Look at those strange inscriptions... It seems like it is glowing more and more'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'Something is happening!'
                    },
                    {
                        'action': 'changeBackground',
                        'newBackground': 'image.spin',
                        'backgroundmode' : 'fit'
                    },
                    {
                        'action': 'wait',
                        'howmuch': 2000
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'Woaaaaaaaaaaa aaaaaahhhhhhhhh'
                    },
                    {
                        'action': 'wait',
                        'howmuch': 2000
                    },
                    {
                        'action' : 'goToExit',
                        'exit'   : 'exit.japan'
                    }
                ]
            },
            {
                'id'    : 'interaction.15',
                'verb'  : 'Talk to',
                'first' : {
                    'item' : 'npc.girl'
                },
                'actions' : [
                    {
                        'action' : 'playDialog',
                        'dialog' : 'dialog.toGirl'
                    }
                ]
            },
            {
                'id'    : 'interaction.16',
                'verb'  : 'Talk to',
                'first' : {
                    'item' : 'npc.togatsu'
                },
                'actions' : [
                    {
                        'action'        : 'startDialogOptions',
                        'dialogOptions' : 'dialogoption.withTogatsu1'
                    }
                ]
            },
            {
                'id'    : 'interaction.17',
                'verb'  : 'Look at',
                'first' : {
                    'item' : 'object.fishingpole',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action'        : 'dialogMessage',
                        'character'     : 'pc.main',
                        'text'          : 'Awesome, a FX-7000 model!'
                    }
                ]
            },
            {
                'id'    : 'interaction.18',
                'verb'  : 'Use',
                'first' : {
                    'item' : 'object.fishingpole',
                    'inInventory' : true
                },
                'second' : {
                    'item' : 'object.lake',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action'        : 'setBusyIcon'
                    },
                    {
                        'action'        : 'dialogMessage',
                        'character'     : 'pc.main',
                        'text'          : 'Let\'s go fish!'
                    },
                    {
                        'action'        : 'changeAttitude',
                        'character'     : 'pc.main',
                        'attitude'      : 'fishing'
                    },
                    {
                        'action': 'wait',
                        'howmuch': 4000
                    },
                    {
                        'action'        : 'dialogMessage',
                        'character'     : 'pc.main',
                        'text'          : 'Wow, I got one fish! They bite hard!'
                    },
                    {
                        'action'        : 'addToInventory',
                        'object'        : 'object.fish'
                    },
                    {
                        'action'        : 'publishAchievement',
                        'achievement'   : 'achievement.fish'
                    },
                    {
                        'action'        : 'changeAttitude',
                        'character'     : 'pc.main',
                        'attitude'      : 'standleft'
                    },
                    {
                        'action'        : 'setDefaultIcon'
                    }
                ]
            },
            {
                'id'    : 'interaction.19',
                'verb'  : 'Give',
                'first' : {
                    'item' : 'object.fish',
                    'inInventory' : true
                },
                'second' : {
                    'item' : 'npc.togatsu'
                },
                'actions' : [
                    {
                        'action'     : 'setBusyIcon'
                    },
                    {
                        'action'     : 'removeFromInventory',
                        'object'     : 'object.fish'
                    },
                    {
                        'action'        : 'dialogMessage',
                        'character'     : 'pc.main',
                        'text'          : 'Here, a fish as promised!'
                    },
                    {
                        'action'        : 'dialogMessage',
                        'character'     : 'npc.togatsu',
                        'text'          : 'Wow, this one is big! Here\'s your rice, kid!'
                    },
                    {
                        'action'     : 'addToInventory',
                        'object'     : 'object.rice'
                    },
                    {
                        'action'     : 'setDefaultIcon'
                    }
                ]
            },
            {
                'id'    : 'interaction.20',
                'verb'  : 'Give',
                'first' : {
                    'item' : 'object.rice',
                    'inInventory' : true
                },
                'second' : {
                    'item' : 'npc.girl'
                },
                'actions' : [
                    {
                        'action'     : 'setBusyIcon'
                    },
                    {
                        'action'     : 'removeFromInventory',
                        'object'     : 'object.rice'
                    },
                    {
                        'action'        : 'dialogMessage',
                        'character'     : 'pc.main',
                        'text'          : 'Here is yoiur rice, little girl. You can stop crying now.'
                    },
                    {
                        'action'        : 'dialogMessage',
                        'character'     : 'npc.girl',
                        'text'          : 'I can\'t believe it! You have saved the celebration!'
                    },
                    {
                        'action'        : 'dialogMessage',
                        'character'     : 'npc.girl',
                        'text'          : 'Togatsu San was even so impressed that he has invited everyone to his giant feast.'
                    },
                    {
                        'action'        : 'dialogMessage',
                        'character'     : 'npc.girl',
                        'text'          : 'Thank you, stranger!'
                    },
                    {
                        'action'         : 'changeBackground',
                        'newBackground'  : 'image.japannewyear',
                        'backgroundmode' : 'fit'
                    },
                    {
                        'action'         : 'publishAchievement',
                        'achievement'    : 'achievement.gameover'
                    },
                    {
                        'action'     : 'setDefaultIcon'
                    }
                ]
            }
        ],
        'scenes': [
            {
                'id'                 : 'scene.backyard',
                'background'         : 'image.backyard',
                'backgroundpath'     : 'image.backyard.path',
                'backgroundmode'     : 'fit',
                'description'        : 'This is the first scene.',
                'interactable'       : true,
                'music'              : 'music.backyard',
                'beginCutscene' : [
                    {
                        'action' : 'setBusyIcon'
                    },
                    {
                        'action' : 'moveTo',
                        'character' : 'pc.main',
                        'position' : {
                            'x': 200,
                            'y': 390
                        }
                    },
                    {
                        'action' : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'  : 'Phew! Studying ancient history and cultures is hard, and worst of all I have a big test tomorrow..'
                    },
                    {
                        'action' : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'  : 'Some fresh air from the back yard seems to help though.. need to clear my mind..'
                    },
                    {
                        'action' : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'  : 'Hey wait! What is that glowing thing over there..'
                    }
                ],
                'npcs' : [],
                'objects' : [
                    {
                        'id' : 'object.amulet',
                        'x'  : 500,
                        'y'  : 330,
                        'w'  : 60,
                        'h'  : 45
                    }
                ],
                'exits' : [
                    {
                        'id' : 'exit.backyard',
                        'label' : 'begin',
                        'role' : 'begin',
                        'x' : 0,
                        'y' : 190,
                        'w' : 100,
                        'h' : 200
                    }
                ],
                'conditions' : []
            },
            {
                'id'                 : 'scene.japan',
                'background'         : 'image.japan',
                'backgroundpath'     : 'image.japan.path',
                'backgroundmode'     : 'overflow',
                'description'        : 'This is the first scene.',
                'interactable'       : true,
                'music'              : 'music.japan',
                'beginCutscene' : [
                    {
                        'action'    : 'moveTo',
                        'character' : 'pc.main',
                        'position'  : {
                            'x' : 170,
                            'y' : 390
                        }
                    },
                    {
                        'action'    : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'      : 'Woah! A second ago I was sitting in my room trying to study for my culture studies exam.'
                    },
                    {
                        'action'    : 'moveTo',
                        'character' : 'pc.main',
                        'position'  : {
                            'x' : 100,
                            'y' : 390
                        }
                    },
                    {
                        'action'    : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'      : 'Where am I? It seems strange but the amulet has transported me to a Japanese village.'
                    },
                    {
                        'action'    : 'moveTo',
                        'character' : 'pc.main',
                        'position'  : {
                            'x' : 170,
                            'y' : 390
                        }
                    },
                    {
                        'action'    : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'      : 'Theres a little girl crying over there, perhaps I should go talk to her.'
                    }
                ],
                'npcs' : [
                    {
                        'id' : 'npc.girl',
                        'position' : {
                            'x'    : 250,
                            'y'    : 350
                        }

                    },
                    {
                        'id' : 'npc.tatsu',
                        'position' : {
                            'x'    : 1350,
                            'y'    : 370
                        }
                    },
                    {
                        'id' : 'npc.togatsu',
                        'position' : {
                            'x'    : 950,
                            'y'    : 380
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
                    },
                    {
                        'id' : 'object.lake',
                        'x'  : 1660,
                        'y'  : 230,
                        'w'  : 400,
                        'h'  : 100
                    }
                ],
                'exits' : [
                    {
                        'id' : 'exit.japan',
                        'label' : 'begin',
                        'role' : 'begin',
                        'x' : 0,
                        'y' : 190,
                        'w' : 100,
                        'h' : 200
                    }
                ],
                'conditions' : [
                    'condition.first',
                    'condition.second'
                ]
            }
        ],
        'flags' : {
            'hasTalkedwithTatsu'        : false,
            'hasHandedJapanFlagToTatsu' : false
        },
        'conditions' : [
            {
                'id' : 'condition.first',
                'ifOn': {
                    'test': 'higherThan',
                    'x' : 1000
                },
                'test': 'flag',
                'item': 'hasTalkedwithTatsu',
                'persistence' : 'once',
                'onFail': [
                    {
                        'action' : 'setBusyIcon'
                    },
                    {
                        'action' : 'moveTo',
                        'character' : 'pc.main',
                        'position' : {
                            'x' : 1200,
                            'y' : 350
                        }
                    },
                    {
                        'action' : 'playDialog',
                        'dialog' : 'dialog.talkToTatsu'
                    },
                    {
                        'action' : 'setDefaultIcon'
                    }
                ]
            },
            {
                'id' : 'condition.second',
                'ifOn': {
                    'test': 'higherThan',
                    'x' : 4450
                },
                'test': 'flag',
                'item': 'hasHandedJapanFlagToTatsu',
                'persistence' : 'always',
                'onFail': [
                    {
                        'action' : 'setBusyIcon'
                    },
                    {
                        'action' : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'  : 'I don\'t handed a Japan flag yet.'
                    },
                    {
                        'action' : 'moveTo',
                        'character' : 'pc.main',
                        'position' : {
                            'x' : 1100,
                            'y' : 350
                        }
                    },
                    {
                        'action' : 'setDefaultIcon'
                    }
                ]
            }
        ],

        'dialogs' : [
            {
                'id'    : 'dialog.talkToTatsu',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Hold it right there, kid!'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'startDialogOptions',
                        'dialogOptions' : 'dialogoption.withTatsu'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuSellingJackets',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Hi. I\'m selling these fine leather jackets.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Do you have XXXXXXL size?'
                    },
                    {
                        'character' : 'pc.main',
                        'text'      : 'Er... not at the moment, no.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Then go away!'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withTatsu'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuMohawk',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'I have never seen a dragon with a mohawk before.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'How many dragons have you seen before?'
                    },
                    {
                        'character' : 'pc.main',
                        'text'      : 'Err... mm... none.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'It\'s a fashion statement. All dragons are wearing it these days.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withTatsu'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuExit',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'I must be going, someone is calling me.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Whatever. You shall not pass!'
                    }
                ],
                'onEnd' : [
                    {
                        'action'    : 'endDialog',
                        'character' : 'npc.tatsu'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTogatsuExit',
                'to'    : 'npc.togatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Look at the time. I gotta go.'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'Mmph.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'    : 'endDialog',
                        'character' : 'npc.togatsu'
                    }
                ]
            },
            {
                'id'    : 'dialog.toGirl',
                'to'    : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Hi! Might I ask who are you?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : 'Woaaaah, I\'m a little crying girl, isn’t it obvious? Woaaaaah'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'startDialogOptions',
                        'dialogOptions' : 'dialogoption.withGirl'
                    }
                ]
            },
            {
                'id'    : 'dialog.withGirlWhyCrying',
                'to'    : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Why are you crying?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : 'Today is Omisoka, and tomorrow we are supposed to celebrate new year.'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : 'But we don\'t have any rice to make Kagami Mochi for the celebration!'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withGirl',
                        'text'          : 'Why do you not have any rice?',
                        'dialog'        : 'dialog.withGirlWhyNotRice',
                        'persistence'   : 'once'
                    },
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withGirl'
                    }
                ]
            },
            {
                'id'    : 'dialog.withGirlNotThatLittle',
                'to'    : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'You don\'t seem that little to me.'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : 'I am actually the tallest in my class.'
                    },
                    {
                        'character' : 'pc.main',
                        'text'      : 'He have actually the same height.'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : 'Yes, but you don\'t have a neck.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withGirl'
                    }
                ]
            },
            {
                'id'    : 'dialog.withGirlScaryPlace',
                'to'    : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'This seems like a scary place for a little girl.'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : 'It didn\'t use to be scary...'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : '...until the dragon Tatsu came to our village.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withGirl',
                        'text'          : 'you said a dragon?',
                        'dialog'        : 'dialog.withGirlWhatIsTatsu',
                        'persistence'   : 'once'
                    },
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withGirl'
                    }
                ]
            },
            {
                'id'    : 'dialog.withGirlWhyNotRice',
                'to'    : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Why do you not have any rice?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : 'All rice has to be bought at Togatsu\'s store...'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : '...but he is refusing to sell us any!'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withGirl',
                        'text'          : 'Why is he refusing to sell you rice?',
                        'dialog'        : 'dialog.withGirlWhyIsTatsu',
                        'persistence'   : 'once'
                    },
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withGirl'
                    }
                ]
            },
            {
                'id'    : 'dialog.withGirlWhatIsTatsu',
                'to'    : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'You said a dr.. a dr... a dragon?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : 'Yes, Tatsu the Dragon. He stole all our fishing equipment...'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      :  '...and he refusing to give it back, unless...'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : '...unless someone answers his riddles.'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : 'All rice has to be bought at Togatsu\'s store.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withGirl',
                        'text'          : 'Where can I find this dragon?',
                        'dialog'        : 'dialog.withGirlFindDragon',
                        'persistence'   : 'once'
                    },
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withGirl'
                    }
                ]
            },
            {
                'id'    : 'dialog.withGirlWhyIsTatsu',
                'to'    : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Why is he refusing to give you rice?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : 'His family hold a giant feast every year...'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : '...but because of dragon Tatsu, they don’t have enough fish...'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : '... they can\'t make osechi-ryōri. He is holding the village ransom!'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withGirl'
                    }
                ]
            },
            {
                'id'    : 'dialog.withGirlFindDragon',
                'to'    : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Where can I find this Tatsu dragon?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text'      : ' He is standing on a bridge in the far east.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withGirl'
                    }
                ]
            },
            {
                'id'    : 'dialog.withGirlBye',
                'to'    : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'See you later.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'    : 'endDialog',
                        'character' : 'npc.girl'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTogatsuRubBelly',
                'to'    : 'npc.togatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Hello! Mind if I rub your belly for good luck?'
                    },
                    {
                        'character' : 'pc.main',
                        'text'      : 'I am going to talk to a dragon, so I definitely need it.'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'You certainly may not! Mmph.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withTogatsu1'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTogatsuWhoAreYou',
                'to'    : 'npc.togatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Hello! Who are you?'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'I am Togatsu San, the wealthiest shopkeeper in all of Okinawa.'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'And you have the silliest selection of clothing I have ever seen.'
                    },
                    {
                        'character' : 'pc.main',
                        'text'      : 'I heard that you sell the best rice around here.'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'Yes, but you will get none! These peasants want their rice, and I will be damned...'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : '...if I\'m not going to use them for my own purpose.'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'Tell me, are you good at answering riddles?'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'startDialogOptions',
                        'dialogOptions' : 'dialogoption.withTogatsu2'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTogatsuBreeze',
                'to'    : 'npc.togatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'I was 4th in the 2013 Seattle county junior spelling bee championship!'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'I don’t think casting spells on bees will help you on solving Tatsu\'s riddles.'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'You better have your homework ready about Japan, it is his favourite subject.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withTogatsu2'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTogatsuJeopardy',
                'to'    : 'npc.togatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'I watch a lot of Jeopardy.'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'Well, I have something that will definitely put your life in jeopardy.'
                    },
                    {
                        'character' : 'pc.main',
                        'text'      : 'And what... what is that?'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'Go talk to that friendly dragon over there, and answer his riddles.'
                    },
                    {
                        'character' : 'npc.togatsu',
                        'text'      : 'And catch me some fish. If you bring back enough, I will sell you some rice.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withTogatsu2'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuFishing',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : ' I hear you have some fishing equipment.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Maybe I do, maybe I don\'t. Wha do you care?'
                    },
                    {
                        'character' : 'pc.main',
                        'text'      : 'I would really like to have a fishing pole.'
                    },
                    {
                        'character' : 'pc.main',
                        'text'      : 'I need some white fish for making Kamaboko'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Well, we can play a game: you have to answer three riddles!'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'If you get them right, I will give you a fishing pole!'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'But if you fail, I will held you hostage until you make me a leather jacket! Agreed?'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withTatsu',
                        'text'          : 'Agreed. Let\'s have the first riddle.',
                        'dialog'        : 'dialog.withTatsuFirstRiddle',
                        'persistence'   : 'once'
                    },
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withTogatsu2'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuFirstRiddle',
                'to'    : 'npc.togatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Agreed. Let\'s have the first riddle.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Here is the first one:'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'What is it that four mice are eating?'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'ねずみが４匹で食べるものなーんだ？'
                    }
                ],
                'onEnd' : [
                    {
                        'action'       : 'addDialogOption',
                        'dialogoption' : 'dialogoption.withTatsuFirstRiddle'
                    }
                ]
            },
            {
                'id'    : 'dialog.firstRiddleFirstAnswer',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Is it Stew?'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Correct! Stew in Japanese is spelled Shichu.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Shi means four, and chu is the sound a mouse makes.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Are you ready for the next riddle?'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withTatsu',
                        'text'          : 'Yes, give me the second riddle.',
                        'dialog'        : 'dialog.withTatsuSecondRiddle',
                        'persistence'   : 'once'
                    },
                    {
                        'action'       : 'continueDialogOptions',
                        'dialogoption' : 'dialogoption.withTatsu'
                    }
                ]
            },
            {
                'id'    : 'dialog.firstRiddleSecondAnswer',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Is it rice?'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Mouses don\'t eat rice! Try again'
                    }
                ],
                'onEnd' : [
                    {
                        'action'       : 'continueDialogOptions',
                        'dialogoption' : 'dialogoption.withTatsuFirstRiddle'
                    }
                ]
            },
            {
                'id'    : 'dialog.firstRiddleThirdAnswer',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'I have no idea what mice eat.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Well, think about it.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'    : 'endDialog',
                        'character' : 'npc.tatsu'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuSecondRiddle',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : ' Yes, give me the second riddle?'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Pay attention:'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Bread is bread, but what bread is inedible?'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : '「パンはパンでも食べられないパンは、'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'なぁに？」答え:「フライパン」?'
                    }
                ],
                'onEnd' : [
                    {
                        'action'       : 'continueDialogOptions',
                        'dialogoption' : 'dialogoption.withTatsuSecondRiddle'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuSecondRiddleFirstAnswer',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'A really dried up bread?'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Hey, a dried up bread is delicious after you heat it...'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : '...for 30 seconds in the microwave. Try again'
                    }
                ],
                'onEnd' : [
                    {
                        'action'       : 'continueDialogOptions',
                        'dialogoption' : 'dialogoption.withTatsuSecondRiddle'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuSecondRiddleSecondAnswer',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Banana bread?'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Bread with bananas? Mmm... Interesting, but wrong.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'       : 'continueDialogOptions',
                        'dialogoption' : 'dialogoption.withTatsuSecondRiddle'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuSecondRiddleThirdAnswer',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'A frying pan?'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Correct! In Japanese, the word for bread is pan.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Ready for the last riddle?'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withTatsu',
                        'text'          : 'I\'m ready for the third and last riddle.',
                        'dialog'        : 'dialog.withTatsuThirdRiddle',
                        'persistence'   : 'once'
                    },
                    {
                        'action'       : 'continueDialogOptions',
                        'dialogoption' : 'dialogoption.withTatsuFirstRiddle'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuGiveUp',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'I give up.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Mmph... wimp!'
                    }
                ],
                'onEnd' : [
                    {
                        'action'    : 'endDialog',
                        'character' : 'npc.tatsu'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuThirdRiddle',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Yes, give me the last riddle.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Ok! Pay attention:'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'What song is traditionally played at new years eve all through Japan?'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'startDisplayDialog',
                        'dialogOptions' : 'dialogoption.withTatsuThirdRiddle'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuThirdRiddleFirstAnswer',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'You\'re the best, by Bill Conti.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'I can\'t stand karate kids. Wrong answer.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Try again.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDisplayDialog',
                        'dialogOptions' : 'dialogoption.withTatsuThirdRiddle'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuThirdRiddleSecondAnswer',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'The theme song to Super Mario Brothers.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Super Mario? Don\'t know what those. Wrong answer.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Try again.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDisplayDialog',
                        'dialogOptions' : 'dialogoption.withTatsuThirdRiddle'
                    }
                ]
            },
            {
                'id'    : 'dialog.withTatsuThirdRiddleThirdAnswer',
                'to'    : 'npc.tatsu',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text'      : 'Beethovens 9th Symphony?'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'Correct! All the orchestras play it during new years.'
                    },
                    {
                        'character' : 'npc.tatsu',
                        'text'      : 'You answered all riddles. Here is your fishing pole.'
                    }
                ],
                'onEnd' : [
                    {
                        'action': 'addToInventory',
                        'object': 'object.fishingpole'
                    },
                    {
                        'action'    : 'endDialog',
                        'character' : 'npc.tatsu'
                    },
                    {
                        'action'      : 'publishAchievement',
                        'achievement' : 'achievement.riddles'
                    }
                ]
            }
        ],
        'dialogoptions' : [
            {
                'id'      : 'dialogoption.withTatsu',
                'choices' : [
                    {
                        'text'        : 'Hi. I\'m selling these fine leather jackets.',
                        'dialog'      : 'dialog.withTatsuSellingJackets',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'I have never seen a dragon with a mohawk before.',
                        'dialog'      : 'dialog.withTatsuMohawk',
                        'persistence' : 'always'
                    },
                    {
                        'text'        : 'I hear you have some fishing equipment.',
                        'dialog'      : 'dialog.withTatsuFishing',
                        'persistence' : 'always'
                    },
                    {
                        'text'        : 'Oops, wrong way. Bye.',
                        'dialog'      : 'dialog.withTatsuExit',
                        'persistence' : 'always'
                    }
                ]
            },
            {
                'id'      : 'dialogoption.withGirl',
                'choices' : [
                    {
                        'text'        : 'Hello. Why are you crying?',
                        'dialog'      : 'dialog.withGirlWhyCrying',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'You don\'t seem that little to me.',
                        'dialog'      : 'dialog.withGirlNotThatLittle',
                        'persistence' : 'always'
                    },
                    {
                        'text'        : 'This seems like a scary place for a little girl.',
                        'dialog'      : 'dialog.withGirlScaryPlace',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'Bye.',
                        'dialog'      : 'dialog.withGirlBye',
                        'persistence' : 'always'
                    }
                ]
            },
            {
                'id'      : 'dialogoption.withTogatsu1',
                'choices' : [
                    {
                        'character'   : 'pc.main',
                        'text'        : 'Hello. Mind if I rub your belly for good luck?',
                        'dialog'      : 'dialog.withTogatsuRubBelly',
                        'persistence' : 'always'
                    },
                    {
                        'text'        : 'Hello. Who are you?',
                        'dialog'      : 'dialog.withTogatsuWhoAreYou',
                        'persistence' : 'always'
                    },
                    {
                        'text'        : 'Nope. Have to go. Bye.',
                        'dialog'      : 'dialog.withTogatsuExit',
                        'persistence' : 'always'
                    }
                ]
            },
            {
                'id'      : 'dialogoption.withTogatsu2',
                'choices' : [
                    {
                        'text'        : 'It should be a breeze.',
                        'dialog'      : 'dialog.withTogatsuBreeze',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'Yes, I watch a lof of Jeopardy.',
                        'dialog'      : 'dialog.withTogatsuJeopardy',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'Nope. Have to go. Bye.',
                        'dialog'      : 'dialog.withTogatsuExit',
                        'persistence' : 'always'
                    }
                ]
            },
            {
                'id' : 'dialogoption.withTatsuFirstRiddle',
                'choices' : [
                    {
                        'text'        : 'It is stew?',
                        'dialog'      : 'dialog.withTatsuFirstRiddleFirstAnswer',
                        'persistence' : 'always'
                    },
                    {
                        'text'        : 'Is it rice?',
                        'dialog'      : 'dialog.withTatsuFirstRiddleSecondAnswer',
                        'persistence' : 'always'
                    },
                    {
                        'text'        : 'I have no idea what mice eat.',
                        'dialog'      : 'dialog.withTatsuFirstRiddleThirdAnswer',
                        'persistence' : 'always'
                    }
                ]
            },
            {
                'id' : 'dialogoption.withTatsuSecondRiddle',
                'choices' : [
                    {
                        'text'        : 'A really dried up bread?',
                        'dialog'      : 'dialog.withTatsuSecondRiddleFirstAnswer',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'Banana bread?',
                        'dialog'      : 'dialog.withTatsuSecondRiddleSecondAnswer',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'A frying pan?',
                        'dialog'      : 'dialog.withTatsuSecondRiddleThirdAnswer',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'I give up',
                        'dialog'      : 'dialog.withTatsuGiveUp',
                        'persistence' : 'always'
                    }
                ]
            },
            {
                'id' : 'dialogoption.withTatsuThirdRiddle',
                'choices' : [
                    {
                        'text'        : 'You\'re the best, by Bill Conti?',
                        'dialog'      : 'dialog.withTatsuThirdRiddleFirstAnswer',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'The theme song to Super Mario Brothers?',
                        'dialog'      : 'dialog.withTatsuThirdRiddleSecondAnswer',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'Beethoven\'s 9th Symphony?',
                        'dialog'      : 'dialog.withTatsuThirdRiddleThirdAnswer',
                        'persistence' : 'once'
                    },
                    {
                        'text'        : 'I give up',
                        'dialog'      : 'dialog.withTatsuGiveUp',
                        'persistence' : 'always'
                    }
                ]
            }

        ],
        'achievements': [
            {
                'id'    : 'achievement.redberry',
                'title' : 'You got a red berry!'
            },
            {
                'id'    : 'achievement.clothes',
                'title' : 'You shamelessly stole clothes!'
            },
            {
                'id'    : 'achievement.squash',
                'title' : 'You ruined a good towel!'
            },
            {
                'id'    : 'achievement.riddles',
                'title' : 'You solved all riddles!'
            },
            {
                'id'    : 'achievement.fish',
                'title' : 'You got your first virtual fish!'
            },
            {
                'id'    : 'achievement.gameover',
                'title' : 'You finished the game!'
            }
        ]
    };
});