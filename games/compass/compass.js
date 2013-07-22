/*global define */

define([
], function () {
    return {
        'images': [
            {
                'id'  : 'background01',
                'src' : 'games/compass/img/background/jungle.jpg'
            },
            {
                'id'  : 'background02',
                'src' : 'games/compass/img/background/legend-of-kyrandia.jpg'
            },
            {
                'id'  : 'background03',
                'src' : 'games/compass/img/background/jungle2.jpg'
            },
            {
                'id'  : 'winebottle01',
                'src' : 'games/compass/img/object/wine-bottle.png'
            },
            {
                'id'  : 'winebottle_inventory01',
                'src' : 'games/compass/img/inventory/wine-bottle.png'
            },
            {
                'id'  : 'winebottlewithoutcork_inventory01',
                'src' : 'games/compass/img/inventory/wine-bottle-without-cork.png'
            },
            {
                'id'  : 'corkscrew_inventory01',
                'src' : 'games/compass/img/inventory/corkscrew.png'
            },
            {
                'id'  : 'cork_inventory01',
                'src' : 'games/compass/img/inventory/cork.png'
            },
            {
                'id'  : 'needlewithcork_inventory01',
                'src' : 'games/compass/img/inventory/needle-with-cork.png'
            },
            {
                'id'  : 'needle_inventory01',
                'src' : 'games/compass/img/inventory/needle.png'
            },
            {
                'id'  : 'magnet_inventory01',
                'src' : 'games/compass/img/inventory/magnet.png'
            }
        ],
        'sounds': [],
        'pc' : {
            'id'    : 'guybrush01',
            'label' : 'you'
        },
        'npcs' : [
            {
                'id'    : 'pirate01',
                'label' : 'pirate'
            }
        ],
        'main': {
            'title'         : 'The compass',
            'author'        : 'teacher@school.com',
            'description'   : 'Can you build a compass?',
            'background'    : 'background02',
            'startingScene' : 'scene01'
        },
        'panel' : {
            'startingInventory' : [
                'magnet01',
                'needle01'
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
                'id': 'winebottle01',
                'label': 'wine bottle',
                'imageInInventory': 'winebottle_inventory01',
                'imageInStage' : 'winebottle01',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : true
            },
            {
                'id': 'magnet01',
                'label': 'magnet',
                'imageInInventory': 'magnet_inventory01',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            },
            {
                'id': 'needle01',
                'label': 'needle',
                'imageInInventory': 'needle_inventory01',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            },
            {
                'id': 'corkscrew01',
                'label': 'corkscrew',
                'imageInInventory': 'corkscrew_inventory01',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            },
            {
                'id': 'cork01',
                'label': 'cork',
                'imageInInventory': 'cork_inventory01',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            },
            {
                'id': 'winebottlewithoutcork01',
                'label': 'uncorked wine bottle',
                'imageInInventory': 'winebottlewithoutcork_inventory01',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            },
            {
                'id': 'needlewithcork01',
                'label': 'uncorked wine bottle',
                'imageInInventory': 'needlewithcork_inventory01',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : false
            }
        ],
        'interactions': [
            {
                'id' : 'interaction01',
                'verb' : 'Use',
                'first': {
                    'type' : 'object',
                    'item' : 'needle01',
                    'inInventory' : true
                },
                'second' : {
                    'type' : 'object',
                    'item' : 'cork01',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'removeFromInventory',
                        'target': 'needle01'
                    },
                    {
                        'action': 'removeFromInventory',
                        'target': 'cork01'
                    },
                    {
                        'action': 'addToInventory',
                        'target': 'needlewithcork01'
                    },
                    {
                        'action': 'dialogMessage',
                        'target': 'guybrush01',
                        'param' : 'I stuck the needle into the cork'
                    }
                ]
            },
            {
                'id' : 'interaction02',
                'verb' : 'Talk to',
                'first' : {
                    'type' : 'character',
                    'item' : 'pirate01'
                },
                'actions' : [
                    {
                        'action': 'playDialog',
                        'target': 'dialog01'
                    }
                ]
            },
            {
                'id' : 'interaction03',
                'verb' : 'Pick up',
                'first': {
                    'type' : 'object',
                    'item' : 'winebottle01',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'fromSceneToInventory',
                        'target': 'winebottle01'
                    },
                    {
                        'action': 'dialogMessage',
                        'target': 'guybrush01',
                        'param' : 'I always wanted a wine bottle.'
                    }
                ]
            },
            {
                'id' : 'interaction04',
                'verb' : 'Look at',
                'first': {
                    'type' : 'object',
                    'item' : 'magnet01',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'target': 'guybrush01',
                        'param' : 'That is on e fine magnet I have!'
                    }
                ]
            },
            {
                'id' : 'interaction05',
                'verb' : 'Look at',
                'first': {
                    'type' : 'object',
                    'item' : 'needle01',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'target': 'guybrush01',
                        'param' : 'Ouch! It\'s sharp!'
                    }
                ]
            },
            {
                'id' : 'interaction06',
                'verb' : 'Look at',
                'first': {
                    'type' : 'object',
                    'item' : 'winebottle01',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'target': 'guybrush01',
                        'param' : 'Mmmm.... wine... tasty!'
                    }
                ]
            },
            {
                'id' : 'interaction07',
                'verb' : 'Use',
                'first': {
                    'type' : 'object',
                    'item' : 'corkscrew01',
                    'inInventory' : true
                },
                'second' : {
                    'type' : 'object',
                    'item' : 'winebottle01',
                    'inInventory' : true
                },
                'actions' : [
                    {
                        'action': 'removeFromInventory',
                        'target': 'winebottle01'
                    },
                    {
                        'action': 'addToInventory',
                        'target': 'winebottlewithoutcork01'
                    },
                    {
                        'action': 'addToInventory',
                        'target': 'cork01'
                    },
                    {
                        'action': 'dialogMessage',
                        'target': 'guybrush01',
                        'param' : 'There, I took the cork out.'
                    }
                ]
            }
        ],
        'scenes': [
            {
                'id'                 : 'scene01',
                'background'         : 'background01',
                'backgroundmode'     : 'overflow',
                'description'        : 'This is the first scene.',
                'interactable'       : true,
                'ending'             : false,
                'playableCharacter'  : {
                    'position' : {
                        'x'    : 0,
                        'y'    : 230
                    }
                },
                'nonPlayableCharacters' : [
                    {
                        'id' : 'pirate01',
                        'position' : {
                            'x'    : 200,
                            'y'    : 230
                        }
                    }
                ],
                'objects' : [
                    {
                        'id' : 'winebottle01',
                        'x'  : 300,
                        'y'  : 330,
                        'w'  : 50,
                        'h'  : 50
                    },
                ],
                'exits' : [
                    {
                        'name' : 'jungle',
                        'x' : 1250,
                        'y' : 200,
                        'w' : 50,
                        'h' : 200,
                        'arrow' : 'right',
                        'to' : 'scene02',
                        'characterPosition' : {
                            'x' : 0,
                            'y' : 230
                        },
                        'condition' : 'condition01'
                    }
                ]
            },
            {
                'id'                 : 'scene02',
                'background'         : 'background03',
                'backgroundmode'     : 'fit',
                'description'        : 'This is the second scene.',
                'interactable'       : true,
                'ending'             : false,
                'playableCharacter'  : {
                    'position' : {
                        'x'    : 51,
                        'y'    : 230
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
                        'to' : 'scene01',
                        'characterPosition' : {
                            'x' : 700,
                            'y' : 230
                        }
                    }
                ]
            }
        ],
        'conditions' : [
            {
                'id' : 'condition01',
                'isInInventory': 'winebottle01',
                'onFail': {
                    'action' : 'dialogMessage',
                    'line'   : 'I can\'t leave without the wine bottle'
                }
            }
        ],
        'dialogs' : [
            {
                'id' : 'dialog01',
                'lines' : [
                    {
                        'character' : 'guybrush01',
                        'line' : 'Hello.'
                    },
                    {
                        'character' : 'pirate01',
                        'line' : 'Hello back.'
                    }
                ],
                'onEnd' : {
                    'action' : 'displayDialogOptions',
                    'dialogOptions' : [
                        {
                            'line' : 'Do you have a compass?',
                            'dialog' : 'dialog02'
                        },
                        {
                            'line' : 'You wouldn\'t have a corkscrew I can borrow?',
                            'dialog' : 'dialog03'
                        },
                        {
                            'line' : 'Bye.',
                            'dialog' : 'dialog04'
                        }
                    ]
                }
            },
            {
                'id' : 'dialog02',
                'lines' : [
                    {
                        'character' : 'guybrush01',
                        'line' : 'Do you have a compass?'
                    },
                    {
                        'character' : 'pirate01',
                        'line' : 'No. Why would I have a compass?'
                    },
                    {
                        'character' : 'guybrush01',
                        'line' : 'Because you are in the jungle!'
                    },
                    {
                        'character' : 'pirate01',
                        'line' : 'I have a GPS, moron. And no, I will not let you use it!'
                    }
                ]
            },
            {
                'id' : 'dialog03',
                'lines' : [
                    {
                        'character' : 'guybrush01',
                        'line' : 'You wouldn\'t have a corkscrew I can borrow?'
                    },
                    {
                        'character' : 'pirate01',
                        'line' : 'Yeah. Here, you can have it.'
                    }
                ],
                'onEnd' : {
                    'action' : 'addToInventory',
                    'object' : 'corkscrew01'
                }
            },
            {
                'id' : 'dialog04',
                'lines' : [
                    {
                        'character' : 'guybrush01',
                        'line' : 'Bye'
                    },
                    {
                        'character' : 'pirate01',
                        'line' : 'Not much of a talker, eh?'
                    }
                ]
            }
        ]
    };
});