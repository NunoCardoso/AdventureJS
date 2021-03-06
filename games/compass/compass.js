/*global define */

define([
], function () {
    return {
        'images': [
            {
                'id'  : 'image.jungle',
                'src' : 'games/compass/img/background/jungle.jpg'
            },
            {
                'id'  : 'image.jungle.path',
                'src' : 'games/compass/img/background/jungle.path.png'
            },
            {
                'id'  : 'image.all.path',
                'src' : 'games/compass/img/background/all.path.png'
            },
            {
                'id'  : 'image.kyrandia',
                'src' : 'games/compass/img/background/legend-of-kyrandia.jpg'
            },
            {
                'id'  : 'image.jungle2',
                'src' : 'games/compass/img/background/jungle2.jpg'
            },
            {
                'id'  : 'image.stage.winebottle',
                'src' : 'games/compass/img/object/wine-bottle.png'
            },
            {
                'id'  : 'image.inventory.winebottle',
                'src' : 'games/compass/img/inventory/wine-bottle.png'
            },
            {
                'id'  : 'image.inventory.winebottlewithoutcork',
                'src' : 'games/compass/img/inventory/wine-bottle-without-cork.png'
            },
            {
                'id'  : 'image.inventory.corkscrew',
                'src' : 'games/compass/img/inventory/corkscrew.png'
            },
            {
                'id'  : 'image.inventory.cork',
                'src' : 'games/compass/img/inventory/cork.png'
            },
            {
                'id'  : 'image.inventory.needlewithcork',
                'src' : 'games/compass/img/inventory/needle-with-cork.png'
            },
            {
                'id'  : 'image.inventory.needle',
                'src' : 'games/compass/img/inventory/needle.png'
            },
            {
                'id'  : 'image.inventory.magnet',
                'src' : 'games/compass/img/inventory/magnet.png'
            },
            {
                'id'  : 'image.inventory.rubberduck',
                'src' : 'games/compass/img/inventory/rubberduck.png'
            },
            {
                'id'  : 'image.inventory.mobilephone',
                'src' : 'games/compass/img/inventory/mobilephone.png'
            },
            {
                'id'  : 'image.inventory.rubberchicken',
                'src' : 'games/compass/img/inventory/rubberchicken.png'
            },
            {
                'id'  : 'image.inventory.sword',
                'src' : 'games/compass/img/inventory/sword.png'
            },
            {
                'id'  : 'image.inventory.map',
                'src' : 'games/compass/img/inventory/map.png'
            },
            {
                'id'  : 'image.inventory.shovel',
                'src' : 'games/compass/img/inventory/shovel.png'
            },
            {
                'id'  : 'image.object.tree',
                'src' : 'games/compass/img/object/tree.png'
            },
            {
                'id'  : 'image.object.tshirt',
                'src' : 'games/compass/img/object/tshirt.png'
            }
        ],
        'sounds': [],
        'musics': [],
        'pc' : {
            'id'    : 'pc.main',
            'label' : 'you'
        },
        'npcs' : [
            {
                'id'    : 'npc.pirate01',
                'label' : 'pirate'
            }
        ],
        'main': {
            'title'         : 'The compass 2',
            'author'        : 'teacher@school.com',
            'description'   : 'Can you build a compass?',
            'background'    : 'image.kyrandia',
            'startingScene' : 'scene.01',
            'music'         : 'music.intro'
        },
        'panel' : {
            'startingInventory' : [
                'object.magnet',
                'object.needle',
                'object.rubberduck',
                'object.mobilephone',
                'object.rubberchicken',
                'object.sword',
                'object.map',
                'object.shovel'
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
                'id': 'object.winebottle',
                'label': 'wine bottle',
                'imageInInventory': 'image.inventory.winebottle',
                'imageInStage' : 'image.stage.winebottle',
                'onForeground' : false
            },
            {
                'id': 'object.magnet',
                'label': 'magnet',
                'imageInInventory': 'image.inventory.magnet'
            },
            {
                'id': 'object.needle',
                'label': 'needle',
                'imageInInventory': 'image.inventory.needle'
            },
            {
                'id': 'object.corkscrew',
                'label': 'corkscrew',
                'imageInInventory': 'image.inventory.corkscrew'
            },
            {
                'id': 'object.cork',
                'label': 'cork',
                'imageInInventory': 'image.inventory.cork'
            },
            {
                'id': 'object.winebottlewithoutcork',
                'label': 'uncorked wine bottle',
                'imageInInventory': 'image.inventory.winebottlewithoutcork'
            },
            {
                'id': 'object.needlewithcork',
                'label': 'uncorked wine bottle',
                'imageInInventory': 'image.inventory.needlewithcork'
            },
            {
                'id': 'object.rubberduck',
                'label': 'rubber duck',
                'imageInInventory': 'image.inventory.rubberduck'
            },
            {
                'id': 'object.mobilephone',
                'label': 'mobile phone',
                'imageInInventory': 'image.inventory.mobilephone'
            },
            {
                'id': 'object.rubberchicken',
                'label': 'rubber chicken',
                'imageInInventory': 'image.inventory.rubberchicken'
            },
            {
                'id': 'object.sword',
                'label': 'sword',
                'imageInInventory': 'image.inventory.sword'
            },
            {
                'id': 'object.map',
                'label': 'treasure map',
                'imageInInventory': 'image.inventory.map'
            },
            {
                'id': 'object.shovel',
                'label': 'shovel',
                'imageInInventory': 'image.inventory.shovel'
            },
            {
                'id': 'object.tree',
                'label': 'tree',
                'imageInStage' : 'image.object.tree',
                'onForeground' : true
            },
            {
                'id': 'object.tshirt',
                'label': 'T-Shirt',
                'imageInStage' : 'image.object.tshirt'
            }
        ],
        'interactions': [
            {
                'id' : 'interaction.01',
                'verb' : 'Use',
                'first': {
                    'item' : 'object.needle',
                    'inInventory' : true
                },
                'second' : {
                    'item' : 'object.cork',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'removeFromInventory',
                        'object': 'object.needle'
                    },
                    {
                        'action': 'removeFromInventory',
                        'object': 'object.cork'
                    },
                    {
                        'action': 'addToInventory',
                        'object': 'object.needlewithcork'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'I stuck the needle into the cork'
                    },
                    {
                        'action': 'publishAchievement',
                        'achievement' : 'achievement.02'
                    }
                ]
            },
            {
                'id' : 'interaction.02',
                'verb' : 'Talk to',
                'first' : {
                    'item' : 'npc.pirate01'
                },
                'actions' : [
                    {
                        'action': 'playDialog',
                        'dialog': 'dialog.01'
                    }
                ]
            },
            {
                'id' : 'interaction.03',
                'verb' : 'Pick up',
                'first': {
                    'item' : 'object.winebottle',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'fromSceneToInventory',
                        'object': 'object.winebottle'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'I always wanted a wine bottle.'
                    }
                ]
            },
            {
                'id' : 'interaction.04',
                'verb' : 'Look at',
                'first': {
                    'item' : 'object.magnet',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'That is on e fine magnet I have!'
                    }
                ]
            },
            {
                'id' : 'interaction.05',
                'verb' : 'Look at',
                'first': {
                    'item' : 'object.needle',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'Ouch! It\'s sharp!'
                    }
                ]
            },
            {
                'id' : 'interaction.06',
                'verb' : 'Look at',
                'first': {
                    'item' : 'object.winebottle',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'Mmmm.... wine... tasty!'
                    }
                ]
            },
            {
                'id' : 'interaction.07',
                'verb' : 'Use',
                'first': {
                    'item' : 'object.corkscrew',
                    'inInventory' : true
                },
                'second' : {
                    'item' : 'object.winebottle',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'removeFromInventory',
                        'object': 'object.winebottle'
                    },
                    {
                        'action': 'addToInventory',
                        'object': 'object.winebottlewithoutcork'
                    },
                    {
                        'action': 'addToInventory',
                        'object': 'object.cork'
                    },
                    {
                        'action': 'dialogMessage',
                        'character': 'pc.main',
                        'text' : 'There, I took the cork out.'
                    }
                ]
            }
        ],
        'scenes': [
            {
                'id'                 : 'scene.01',
                'background'         : 'image.jungle',
                'backgroundpath'     : 'image.jungle.path',
                'backgroundmode'     : 'overflow',
                'description'        : 'This is the first scene.',
                'interactable'       : true,
                'conditions'         : [],
/*                'beginCutscene' : [

                    {
                        'action' : 'moveTo',
                        'character' : 'pc.main',
                        'position' : {
                            'x': 300,
                            'y': 380
                        }
                    },
                    {
                        'action' : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'  : 'I\'m lost. I need a compass.'
                    },
                    {
                        'action' : 'moveTo',
                        'character' : 'pc.main',
                        'position' : {
                            'x': 400,
                            'y': 380
                        }
                    },
                    {
                        'action' : 'dialogMessage',
                        'character' : 'pc.main',
                        'text'  : 'Maybe that pirate can help me.'
                    }
                ],*/
                'npcs' : [
                    {
                        'id' : 'npc.pirate01',
                        'position' : {
                            'x'    : 200,
                            'y'    : 380
                        }
                    }
                ],
                'objects' : [
                    {
                        'id' : 'object.winebottle',
                        'x'  : 300,
                        'y'  : 330,
                        'w'  : 50,
                        'h'  : 50
                    },
                    {
                        'id' : 'object.tree',
                        'x'  : 500,
                        'y'  : 100,
                        'w'  : 250,
                        'h'  : 300
                    }
                ],
                'exits' : [
                    {
                        'id' : 'exit.01',
                        'label' : 'begin',
                        'role' : 'begin',
                        'x' : 0,
                        'y' : 190,
                        'w' : 100,
                        'h' : 200
                    },
                    {
                        'id' : 'exit.02',
                        'label' : 'jungle',
                        'role' : 'channel',
                        'x' : 400,
                        'y' : 200,
                        'w' : 50,
                        'h' : 200,
                        'arrow' : 'right',
                        'condition' : 'condition.01'
                    }
                ]
            },
            {
                'id'                 : 'scene.02',
                'background'         : 'image.jungle2',
                'backgroundmode'     : 'fit',
                'backgroundpath'     : 'image.all.path',
                'description'        : 'This is the second scene.',
                'interactable'       : true,
                'objects' : [],
                'exits' : [
                    {
                        'id' : 'exit.03',
                        'label' : 'jungle entrance',
                        'role' : 'channel',
                        'x' : 100,
                        'y' : 200,
                        'w' : 50,
                        'h' : 200,
                        'arrow' : 'left',
                        'condition' : 'condition.03'
                    },
                    {
                        'id' : 'exit.04',
                        'role' : 'end',
                        'label' : 'end',
                        'x' : 600,
                        'y' : 200,
                        'w' : 50,
                        'h' : 200,
                        'condition' : 'condition.02'
                    }
                ]
            }
        ],
        'flags' : {},
        'conditions' : [
            {
                'id' : 'condition.01',
                'test' :  'isInInventory',
                'item' : 'object.winebottle',
                'onFail': [{
                    'action' : 'dialogMessage',
                    'character' : 'pc.main',
                    'text'  : 'I can\'t leave without the wine bottle'
                }],
                'onSuccess'  : [{
                    'action' : 'goToExit',
                    'exit'   : 'exit.03'
                }]
            },
            {
                'id'     : 'condition.02',
                'test'   : 'isInInventory',
                'item'   : 'object.compass',
                'onFail' : [{
                    'action'    : 'dialogMessage',
                    'character' : 'pc.main',
                    'text'      : 'I can\'t leave without a compass!'
                }],
                'onSuccess'  : [{
                    'action' : 'endGame'
                }]
            },
            {
                'id'   : 'condition.03',
                'test' : 'alwaysTrue',
                'onSuccess'  : [{
                    'action' : 'goToExit',
                    'exit'   : 'exit.02'
                }]
            }
        ],
        'dialogs' : [
            {
                'id' : 'dialog.01',
                'to' : 'npc.pirate01',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Hello.'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'Hello back.'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'startDialogOptions',
                        'dialogOptions' : 'dialogoption.01'
                    }
                ]
            },
            {
                'id' : 'dialog.02',
                'to' : 'npc.pirate01',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Do you have a compass?'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'No. Why would I have a compass?'
                    },
                    {
                        'character' : 'pc.main',
                        'text' : 'Because you are in the jungle!'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'I have a GPS, moron. And no, I will not let you use it!'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.01'
                    }
                ]
            },
            {
                'id' : 'dialog.03',
                'to' : 'npc.pirate01',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'You wouldn\'t have a corkscrew I can borrow?'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'Yeah. Here, you can have it.'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'addToInventory',
                        'object' : 'object.corkscrew'
                    },
                    {
                        'action' : 'publishAchievement',
                        'achievement' : 'achievement.01'
                    },
                    {
                        'action' : 'endDialog',
                        'character' : 'npc.pirate01'
                    }
                ]
            },
            {
                'id' : 'dialog.04',
                'to' : 'npc.pirate01',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Please go.'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'Ok. Bye.'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'fadeToLeft',
                        'character' : 'npc.pirate01'
                    },
                    {
                        'action' : 'endDialog',
                        'character' : 'npc.pirate01'
                    }
                ]
            },
            {
                'id' : 'dialog.05',
                'to' : 'npc.pirate01',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Nice weather, huh?'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'Yup. It\'s going to rain, though.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.01'
                    }
                ]
            },
            {
                'id' : 'dialog.06',
                'to' : 'npc.pirate01',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'I\'m selling these fine leather jackets.'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'Already have one, thanks.'
                    }
                ],
                'onEnd' : [
                    {
                        'action'        : 'continueDialogOptions',
                        'dialogOptions' : 'dialogoption.01'
                    }
                ]
            },
            {
                'id' : 'dialog.07',
                'to' : 'npc.pirate01',
                'lines' : [
                    {
                        'character' : 'pc.main',
                        'text' : 'Bye'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'Not much of a talker, eh?'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'endDialog',
                        'character' : 'npc.pirate01'
                    }
                ]
            }
        ],
        'dialogoptions' : [
            {
                'id' : 'dialogoption.01',
                'choices' : [
                    {
                        'text' : 'Do you have a compass?',
                        'dialog' : 'dialog.02',
                        'persistence' : 'once'
                    },
                    {
                        'text' : 'You wouldn\'t have a corkscrew I can borrow?',
                        'dialog' : 'dialog.03',
                        'persistence' : 'once'
                    },
                    {
                        'text' : 'Plase go.',
                        'dialog' : 'dialog.04',
                        'persistence' : 'once'
                    },
                    {
                        'text' : 'Nice weather, huh?',
                        'dialog' : 'dialog.05',
                        'persistence' : 'always'
                    },
                    {
                        'text' : 'I\'m selling these fine leather jackets',
                        'dialog' : 'dialog.06',
                        'persistence' : 'always'
                    },
                    {
                        'text' : 'Bye.',
                        'dialog' : 'dialog.07',
                        'persistence' : 'always'
                    }
                ]
            }
        ],
        'achievements': [
            {
                'id' : 'achievement.01',
                'title' : 'Managed to get a corkscrew'
            },
            {
                'id' : 'achievement.02',
                'title' : 'Managed to stuck the needle in the cork'
            },
            {
                'id' : 'achievement.gameover',
                'title' : 'You finished the game!'
            }
        ]
    };
});