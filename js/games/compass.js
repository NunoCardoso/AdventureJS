/*global define */

define([
], function () {
    return {
        'images': [
            {
                'id'  : 'background01',
                'src' : 'img/background/jungle.jpg'
            },
            {
                'id'  : 'background02',
                'src' : 'img/background/legend-of-kyrandia.jpg'
            },
            {
                'id'  : 'background03',
                'src' : 'img/background/jungle2.jpg'
            },
            {
                'id'  : 'playableCharacter01',
                'src' : 'img/character/guybrush2.png'
            },
            {
                'id'  : 'nonPlayableCharacter01',
                'src' : 'img/character/pirate.png'
            },
            {
                'id'  : 'winebottleinventory01',
                'src' : 'img/inventory/wine-bottle.jpg'
            },
            {
                'id'  : 'winebottle01',
                'src' : 'img/object/wine-bottle.png'
            }
        ],
        'sounds': [
            {
                'id'  : 'sound.fall',
                'src' : 'snd/fall.wav'
            },
            {
                'id'  : 'sound.laser',
                'src' : 'snd/laser.aiff'
            },
            {
                'id'  : 'sound.fight',
                'src' : 'snd/fight.wav'
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
                'winebottle01',
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
        'playableCharacter': {
            'id'     : 'you01',
            'name'   : 'you',
            'images' : 'playableCharacter01',
            'speed'  : 2,
            'frames' : {
                'regX'   : 52,
                'height' : 150,
                'count'  : 30,
                'regY'   : 0,
                'width'  : 104
            },
            'animations' : {
                'walkright'  : [0, 5, 'walkright', 6],
                'walkleft'   : [6, 11, 'walkleft', 6],
                'standright' : 12,
                'standleft'  : 13,
                'talkright'  : [18, 22, 'talkright', 6],
                'talkleft'   : [24, 27, 'talkleft', 6],
            }
        },
        'nonPlayableCharacters' : [
            {
                'id'     : 'pirate01',
                'name'   : 'pirate',
                'images' : 'nonPlayableCharacter01',
                'frames' : {
                    'regX'   : 52,
                    'height' : 150,
                    'count'  : 12,
                    'regY'   : 0,
                    'width'  : 104
                },
                'animations' : {
                    'standleft'  : 1,
                    'standright' : 2,
                    'talkleft'   : [5, 8, 'talkleft', 4],
                    'talkright'  : [9, 12, 'talkright', 4]
                }
            }
        ],
        'objects': [
            {
                'id': 'winebottle01',
                'label': 'wine bottle',
                'imageInInventory': 'winebottleinventory01',
                'imageInStage' : 'winebottle01',
                'canBeOnStage' : false,
                'canBeOnInventory' : true,
                'canBePickedUp' : true
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
                        'target': 'corkwithneedle01'
                    },
                    {
                        'action': 'dialogMessage',
                        'target': 'you01',
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
                'verb' : 'Push',
                'first': {
                    'type' : 'object',
                    'item' : 'winebottle01',
                    'inInventory' : false
                },
                'actions' : [
                    {
                        'action': 'dialogMessage',
                        'target': 'you01',
                        'param' : 'I can\'t push a wine bottle!'
                    }
                ]
            }
        ],
        'scenes': [
            {
                'id'                 : 'scene01',
                'background'         : 'background01',
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
                            'x'    : 400,
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
                        'x' : 750,
                        'y' : 200,
                        'w' : 50,
                        'h' : 200,
                        'arrow' : 'right',
                        'to' : 'scene02',
                        'characterPosition' : {
                            'x' : 0,
                            'y' : 230
                        }
                    }
                ]
            },
            {
                'id'                 : 'scene02',
                'background'         : 'background03',
                'description'        : 'This is the second scene.',
                'interactable'       : true,
                'ending'             : false,
                'playableCharacter'  : {
                    'position' : {
                        'x'    : 51,
                        'y'    : 230
                    }
                },
                'objects' : [
                    {
                        'id' : 'winebottle01',
                        'x'  : 300,
                        'y'  : 330,
                        'w'  : 50,
                        'h'  : 50
                    }
                ],
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
        'dialogs' : [
            {
                'id' : 'dialog01',
                'lines' : [
                    {
                        'character' : 'you01',
                        'line' : 'Hello.'
                    },
                    {
                        'character' : 'pirate01',
                        'line' : 'Hello back.'
                    },
                    {
                        'character' : 'you01',
                        'line' : 'Do you have a compass?'
                    },
                    {
                        'character' : 'pirate01',
                        'line' : 'No. Why would I have a compass?'
                    },
                    {
                        'character' : 'you01',
                        'line' : 'Because you are in the jungle!'
                    },
                    {
                        'character' : 'pirate01',
                        'line' : 'I have a GPS, moron. And no, I will not let you use it!'
                    }
                ]
            }
        ]
    };
});