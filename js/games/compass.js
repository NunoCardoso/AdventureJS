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
                'id'  : 'playableCharacter01',
                'src' : 'img/character/guybrush.png'
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
        'console' : {
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
                'regX'   : 0,
                'height' : 150,
                'count'  : 18,
                'regY'   : 0,
                'width'  : 104
            },
            'animations' : {
                'walkright'  : [0, 5, 'walkright', 6],
                'walkleft'   : [6, 11, 'walkleft', 6],
                'standright' : 12,
                'standleft'  : 13
            }
        },
        'nonPlayableCharacter' : [],
        'objects': [
            {
                'id': 'winebottle01',
                'label': 'Wine bottle',
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
                'verb' : 'use',
                'first': {
                    'type' : 'object',
                    'item' : 'needle01',
                    'inInventory' : true
                },
                'to' : true,
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
                'verb' : 'talk',
                'first' : {
                    'type' : 'character',
                    'item' : 'pirate01'
                },
                'to' : false
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
                'objects' : [
                    {
                        'id': 'winebottle01',
                        'x' : 300,
                        'y' : 300,
                        'width' : 50,
                        'height' : 50
                    }
                ],
                'exits' : []
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