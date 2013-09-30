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
            }
        ],
        'sounds' : [],
        'musics' : [
            {
                'id'  : 'music.intro',
                'src' : 'games/aroundtheworld/msc/game-intro.wav'
            },
            {
                'id'  : 'music.backyard',
                'src' : 'games/aroundtheworld/msc/game-scene01.wav'
            },
            {
                'id'  : 'music.japan',
                'src' : 'games/aroundtheworld/msc/japan.mp3'
            }
        ],
        'pc' : {
            'id'    : 'pc.main',
            'label' : 'you'
        },
        'npcs' : [
            {
                'id'    : 'npc.bowser',
                'label' : 'Bowser'
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
                    },
                    {
                        'action': 'changeBackground',
                        'newBackground': 'image.japannewyear'
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
                    'item' : 'npc.bowser'
                },
                'actions' : [
                    {
                        'action': 'playDialog',
                        'dialog': 'dialog.talktobowser'
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
                    'item' : 'npc.bowser'
                },
                'actions' : [
                    {
                        'action': 'playDialog',
                        'dialog': 'dialog.giveshirttobowser'
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
                    'item' : 'npc.bowser'
                },
                'actions' : [
                    {
                        'action': 'playDialog',
                        'dialog': 'dialog.givetowelwithredberrytobowser'
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
                        'text' : 'What is he doing here?'
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
                        'text' : 'Wow, what is this doing here? Looks ancient. Looks...'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : '...Japanese?'
                    },
                    {
                        'action': 'changeBackground',
                        'newBackground': 'image.spin'
                    },
                    {
                        'action': 'wait',
                        'howmuch': 2000
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'I\'m feeling a little dizzy, what is going on?'
                    },
                    {
                        'action': 'wait',
                        'howmuch': 2000
                    },
                    {
                        'action' : 'goToExit',
                        'exit'   : 'exit.tojapan'
                    },
                    {
                        'action' : 'setDefaultIcon'
                    }
                ]
            },
            {
                'id' : 'interaction.15',
                'verb' : 'Talk to',
                'first' : {
                    'item' : 'npc.girl'
                },
                'actions' : [
                    {
                        'action': 'playDialog',
                        'dialog': 'dialog.talktogirl'
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
                        'text'  : 'Tired of studing ancient history!'
                    },
                    {
                        'action' : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'  : 'I mean, who needs to learn things about ancient Japan?'
                    },
                    {
                        'action' : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'  : 'Like it is going to be useful for me. Ah ah ah!'
                    },
                    {
                        'action' : 'setDefaultIcon'
                    }
                ],
                'npcs' : [],
                'objects' : [
                    {
                        'id' : 'object.amulet',
                        'x'  : 500,
                        'y'  : 300,
                        'w'  : 30,
                        'h'  : 30
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
                        'action' : 'setDefaultIcon'
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
                        'text'      : 'Now it seems like I have been transported a village in Japan.'
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
                        'text'      : 'Perhaps the amulet I found in the back yard yesterday is magic?'
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
                        'id' : 'npc.bowser',
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
            'hasTalkedWithBowser'        : false,
            'hasHandedJapanFlagToBowser' : false
        },
        'conditions' : [
            {
                'id' : 'condition.first',
                'ifOn': {
                    'test': 'higherThan',
                    'x' : 1000
                },
                'test': 'flag',
                'item': 'hasTalkedWithBowser',
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
                        'dialog' : 'dialog.talktobowser'
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
                'item': 'hasHandedJapanFlagToBowser',
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
                'id' : 'dialog.talktobowser',
                'to' : 'npc.bowser',
                'lines' : [
                    {
                        'character' : 'npc.bowser',
                        'text' : 'Halt! Where are you going?'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'startDialogOptions',
                        'dialogOptions' : 'dialogoption.withbowser'
                    }
                ]
            },
            {
                'id' : 'dialog.sellingjackets',
                'to' : 'npc.bowser',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Hi. I’m selling these fine leather jackets.'
                    },
                    {
                        'character' : 'npc.bowser',
                        'text' : 'Do you have XXXXXXL size?'
                    },
                    {
                        'character' : 'pc.main',
                        'text' : 'Er... not at the moment, no.'
                    },
                    {
                        'character' : 'npc.bowser',
                        'text' : 'Then I am not interested!'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withbowser'
                    }
                ]
            },
            {
                'id' : 'dialog.mayipass',
                'to' : 'npc.bowser',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Hello. May I pass please?'
                    },
                    {
                        'character' : 'npc.bowser',
                        'text' : 'Depends. What do you know about Japan?'
                    },
                    {
                        'character' : 'pc.main',
                        'text' : 'I know that Nintendos come from there.'
                    },
                    {
                        'character' : 'npc.bowser',
                        'text' : 'Ninten- what is that?!'
                    },
                    {
                        'character' : 'pc.main',
                        'text' : 'Oh yeah, we’re in the XIX century. Doh.'
                    },
                    {
                        'character' : 'npc.bowser',
                        'text' : 'You can’t pass unless you can prove that you know about Japan!'
                    },
                    {
                        'character' : 'pc.main',
                        'text' : 'Ok, so what should I do to prove that?'
                    },
                    {
                        'character' : 'npc.bowser',
                        'text' : 'You can show me a flag of Japan, and I will let you pass. Deal?'
                    },
                    {
                        'character' : 'pc.main',
                        'text' : 'Ok, deal.'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withbowser'
                    }
                ]
            },
            {
                'id' : 'dialog.hereitis',
                'to' : 'npc.bowser',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Hi. Here it is. The flag of Japan.'
                    },
                    {
                        'character' : 'npc.bowser',
                        'text' : 'What? This is a shirt!'
                    },
                    {
                        'character' : 'pc.main',
                        'text' : 'No, but the colours and pattern match. See?'
                    },
                    {
                        'character' : 'npc.bowser',
                        'text' : 'This is the flag of France! Try again.'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'endDialog',
                        'character' : 'npc.bowser'
                    }
                ]
            },
            {
                'id' : 'dialog.hereitis',
                'to' : 'npc.bowser',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Here it is. The flag of Japan.'
                    },
                    {
                        'character' : 'npc.bowser',
                        'text' : 'Mmm yes, it is. OK, you may pass now.'
                    },
                    {
                        'character' : 'pc.main',
                        'text' : 'Thanks.'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'endDialog',
                        'character' : 'npc.bowser'
                    }
                ]
            },
            {
                'id' : 'dialog.wrongway',
                'to' : 'npc.bowser',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'I must be going. Duty calls.'
                    },
                    {
                        'character' : 'npc.bowser',
                        'text' : 'I\'ll be here, blocking your path.'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'endDialog',
                        'character' : 'npc.bowser'
                    }
                ]
            },
            {
                'id' : 'dialog.talktogirl',
                'to' : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Hi! Might I ask who you are?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : 'Woaaaah, I\'m a little crying girl, isn’t it obvious? Woaaaaah'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'startDialogOptions',
                        'dialogOptions' : 'dialogoption.withgirl1'
                    }
                ]
            },
            {
                'id' : 'dialog.whycrying',
                'to' : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Hello. Why are you crying?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : 'Today is Omisoka, and tomorrow we are supposed to celebrate new year.'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : 'But we don\'t have any rice to make Kagami Mochi for the celebration!'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withgirl1',
                        'text'          : 'Why do you not have any rice?',
                        'dialog'        : 'dialog.whynotrice',
                        'persistence'   : 'once'
                    },
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withgirl1'
                    }
                ]
            },
            {
                'id' : 'dialog.notthatlittle',
                'to' : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'You don\'t seem that little to me.'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : 'I am actually the tallest in my class.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withgirl1'
                    }
                ]
            },
            {
                'id' : 'dialog.scaryplace',
                'to' : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'This seems like a scary place for a little girl.'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : 'It didn\'t use to be scary, until the dragon Tatsu came to our village.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withgirl1',
                        'text'          : 'What is Tatsu doing?',
                        'dialog'        : 'dialog.whatistatsu',
                        'persistence'   : 'once'
                    },
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withgirl1'
                    }
                ]
            },
            {
                'id' : 'dialog.whynotrice',
                'to' : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Why do you not have any rice?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : 'All the rice has to be bought at Togatsu\'s store...'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : '...but he is refusing to give us any!'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withgirl1',
                        'text'          : 'Why is he refusing to give you rice?',
                        'dialog'        : 'dialog.whyistatsu',
                        'persistence'   : 'once'
                    },
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withgirl1'
                    }
                ]
            },
            {
                'id' : 'dialog.whatistatsu',
                'to' : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'What is Tatsu doing?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : 'Tatsu has stolen all our fishing equipment, and he refusing to give it back...'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : '...until someone can answers his three riddles.'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : 'All the rice has to be bought at Togatsu\'s store...'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'addDialogOption',
                        'dialogOptions' : 'dialogoption.withgirl1',
                        'text'          : 'Where can I find this dragon?',
                        'dialog'        : 'dialog.finddragon',
                        'persistence'   : 'once'
                    },
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withgirl1'
                    }
                ]
            },
            {
                'id' : 'dialog.whyistatsu',
                'to' : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Why is he refusing to give you rice?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : 'His family and servants hold a giant feast every year...'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : '...but because of Tatsu they don’t have enough fish to make osechi-ryōri.'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : 'He is holding the village ransom!'
                    },
                    {
                        'character' : 'pc.main',
                        'text' : 'Thank you, I\'ll try my best.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withgirl1'
                    }
                ]
            },
            {
                'id' : 'dialog.finddragon',
                'to' : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Where can I find this dragon?'
                    },
                    {
                        'character' : 'npc.girl',
                        'text' : ' He is standing on a bridge in the far east.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.withgirl1'
                    }
                ]
            },
            {
                'id' : 'dialog.bye',
                'to' : 'npc.girl',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'bye.'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'endDialog',
                        'character' : 'npc.girl'
                    }
                ]
            }
        ],
        'dialogoptions' : [
            {
                'id' : 'dialogoption.withbowser',
                'choices' : [
                    {
                        'text' : 'Hi. I’m selling these fine leather jackets.?',
                        'dialog' : 'dialog.sellingjackets',
                        'persistence' : 'once'
                    },
                    {
                        'text' : 'Hello. May I pass please?',
                        'dialog' : 'dialog.mayipass',
                        'persistence' : 'always'
                    },
                    {
                        'text' : 'Oops, wrong way. Bye.',
                        'dialog' : 'dialog.wrongway',
                        'persistence' : 'always'
                    }
                ]
            },
            {
                'id' : 'dialogoption.withgirl1',
                'choices' : [
                    {
                        'text' : 'Hello. Why are you crying?',
                        'dialog' : 'dialog.whycrying',
                        'persistence' : 'once'
                    },
                    {
                        'text' : 'You don\'t seem that little to me.',
                        'dialog' : 'dialog.notthatlittle',
                        'persistence' : 'always'
                    },
                    {
                        'text' : 'This seems like a scary place for a little girl.',
                        'dialog' : 'dialog.scaryplace',
                        'persistence' : 'once'
                    },
                    {
                        'text' : 'Bye.',
                        'dialog' : 'dialog.bye',
                        'persistence' : 'always'
                    }
                ]
            }
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