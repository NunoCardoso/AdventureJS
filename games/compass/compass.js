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
            }
        ],
        'sounds': [],
        'pc' : {
            'id'    : 'pc.guybrush',
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
            'startingScene' : 'scene.01'
        },
        'panel' : {
            'startingInventory' : [
                'object.magnet',
                'object.needle'
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
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : true
            },
            {
                'id': 'object.magnet',
                'label': 'magnet',
                'imageInInventory': 'image.inventory.magnet',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            },
            {
                'id': 'object.needle',
                'label': 'needle',
                'imageInInventory': 'image.inventory.needle',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            },
            {
                'id': 'object.corkscrew',
                'label': 'corkscrew',
                'imageInInventory': 'image.inventory.corkscrew',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            },
            {
                'id': 'object.cork',
                'label': 'cork',
                'imageInInventory': 'image.inventory.cork',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            },
            {
                'id': 'object.winebottlewithoutcork',
                'label': 'uncorked wine bottle',
                'imageInInventory': 'image.inventory.winebottlewithoutcork',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            },
            {
                'id': 'needlewithcork01',
                'label': 'uncorked wine bottle',
                'imageInInventory': 'image.inventory.needlewithcork',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
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
                        'target': 'object.needle'
                    },
                    {
                        'action': 'removeFromInventory',
                        'target': 'object.cork'
                    },
                    {
                        'action': 'addToInventory',
                        'target': 'object.needlewithcork'
                    },
                    {
                        'action': 'dialogMessage',
                        'target': 'pc.guybrush',
                        'param' : 'I stuck the needle into the cork'
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
                        'target': 'dialog.01'
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
                        'target': 'object.winebottle'
                    },
                    {
                        'action': 'dialogMessage',
                        'target': 'pc.guybrush',
                        'param' : 'I always wanted a wine bottle.'
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
                        'target': 'pc.guybrush',
                        'param' : 'That is on e fine magnet I have!'
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
                        'target': 'pc.guybrush',
                        'param' : 'Ouch! It\'s sharp!'
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
                        'target': 'pc.guybrush',
                        'param' : 'Mmmm.... wine... tasty!'
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
                        'target': 'object.winebottle'
                    },
                    {
                        'action': 'addToInventory',
                        'target': 'object.winebottlewithoutcork'
                    },
                    {
                        'action': 'addToInventory',
                        'target': 'object.cork'
                    },
                    {
                        'action': 'dialogMessage',
                        'target': 'pc.guybrush',
                        'param' : 'There, I took the cork out.'
                    }
                ]
            }
        ],
        'scenes': [
            {
                'id'                 : 'scene.01',
                'background'         : 'image.jungle',
                'backgroundmode'     : 'overflow',
                'description'        : 'This is the first scene.',
                'interactable'       : true,
                'ending'             : false,
                'pc'  : {
                    'position' : {
                        'x'    : 70,
                        'y'    : 380
                    }
                },
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
                ],
                'exits' : [
                    {
                        'name' : 'jungle',
                        'x' : 700,
                        'y' : 200,
                        'w' : 50,
                        'h' : 200,
                        'arrow' : 'right',
                        'to'    : 'scene.02',
                        'pc_xy' : {
                            'x' : 75,
                            'y' : 380
                        },
                        'condition' : 'condition.01'
                    }
                ]
            },
            {
                'id'                 : 'scene.02',
                'background'         : 'image.jungle2',
                'backgroundmode'     : 'fit',
                'description'        : 'This is the second scene.',
                'interactable'       : true,
                'ending'             : false,
                'pc'  : {
                    'position' : {
                        'x'    : 51,
                        'y'    : 380
                    }
                },
                'objects' : [],
                'exits' : [
                    {
                        'x' : 0,
                        'y' : 200,
                        'w' : 50,
                        'h' : 200,
                        'arrow' : 'left',
                        'to' : 'scene.01',
                        'pc_xy' : {
                            'x' : 700,
                            'y' : 380
                        }
                    }
                ]
            }
        ],
        'conditions' : [
            {
                'id' : 'condition.01',
                'isInInventory': 'object.winebottle',
                'onFail': {
                    'action' : 'dialogMessage',
                    'text'   : 'I can\'t leave without the wine bottle'
                }
            }
        ],
        'dialogs' : [
            {
                'id' : 'dialog.01',
                'lines' : [
                    {
                        'character' : 'pc.guybrush',
                        'text' : 'Hello.'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'Hello back.'
                    }
                ],
                'onEnd' : [
                    {
                        'action' : 'displayDialogOptions',
                        'dialogOptions' : [
                            {
                                'text' : 'Do you have a compass?',
                                'dialog' : 'dialog.02'
                            },
                            {
                                'text' : 'You wouldn\'t have a corkscrew I can borrow?',
                                'dialog' : 'dialog.03'
                            },
                            {
                                'text' : 'Bye.',
                                'dialog' : 'dialog.04'
                            }
                        ]
                    }
                ]
            },
            {
                'id' : 'dialog.02',
                'lines' : [
                    {
                        'character' : 'pc.guybrush',
                        'text' : 'Do you have a compass?'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'No. Why would I have a compass?'
                    },
                    {
                        'character' : 'pc.guybrush',
                        'text' : 'Because you are in the jungle!'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'I have a GPS, moron. And no, I will not let you use it!'
                    }
                ]
            },
            {
                'id' : 'dialog.03',
                'lines' : [
                    {
                        'character' : 'pc.guybrush',
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
                    }
                ]
            },
            {
                'id' : 'dialog.04',
                'lines' : [
                    {
                        'character' : 'pc.guybrush',
                        'text' : 'Bye'
                    },
                    {
                        'character' : 'npc.pirate01',
                        'text' : 'Not much of a talker, eh?'
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
            }
        ]
    };
});