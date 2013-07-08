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
                'id'  : 'PC01',
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
        'main': {
            'title' : 'The compass',
            'author' : 'teacher@school.com',
            'description' : 'Can you build a compass?',
            'background' : 'background01'
        },
        'pc': {
            'id' : 'you01',
            'images': 'PC01',
            'frames': {
                'regX'  : 0,
                'height': 150,
                'count' : 18,
                'regY'  : 0,
                'width' : 104
            },
            'animations': {
                'walkright' : [0, 5, 'walkright', 6],
                'walkleft'  : [6, 11, 'walkleft', 6],
                'standright': 12,
                'standleft' : 13
            }
        },
        'objects': [
            {
                'id': 'winebottle01',
                'label': 'Wine bottle',
                'imageInInventory': 'winebottleinventory01',
                'imageInScene' : 'winebottle01'
            }
        ],
        'objectInteraction': [],
        'scenes': [
            {
                'id'          : 'scene01',
                'background'  : 'background01',
                'description' : 'This is the first scene.',
                'interactable': true,
                'ending'      : false,
                'characters'  : [
                    {
                        'who' : 'you01',
                        'position' : {
                            'x' : 0,
                            'y' : 230
                        }
                    }
                ],
                'objects' : [
                    {
                        'id': 'winebottle01',
                        'x' : 300,
                        'y' : 300,
                        'width' : 50,
                        'height' : 50
                    }
                ]
            }
        ],
        'initialInventory' : [],
        'initialScene' : {
            'id' : 'scene01'
        },
        'dialogs' : []
    };
});