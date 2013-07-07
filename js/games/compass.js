define([
], function () {
return {
    'images': {
		'background01': 'img/background/jungle.jpg',
		'PC01' : 'img/character/guybrush.png',
        'winebottleinventory01' : 'img/inventory/wine-bottle.jpg',
		'winebottle01' : 'img/object/wine-bottle.png'
    },
    'main': {
		'title' : 'The compass',
		'author' : 'teacher@school.com',
		'description' : 'Can you build a compass?',
		'background' : 'background01'
	},
    'PC': {
        'id' : 'you01',
		'images': 'PC01',
		'frames': {
			'regX'  : 0, 
			'height': 150, 
			'count' : 18, 
			'regY'  : 0, 
			'width' : 104
		},
		'animations':{
			'walkright' :[0,5,'walkright',6],
			'walkleft'  :[6,11,'walkleft',6],
			'standright':12,
			'standleft' :13
		}
	},
	'objects':[
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
			"id": "scene01",
			"background": "background01",
			"preamble": "This is the first scene.",
			"characters" : [
                {
					"who" : 'you01',
					"position" : {
						"x" : 0,
						"y" : 230
					}
				}
  			],
	        'objects': [
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
	"initialInventory": [],
	"initialScene": {
		"id": "scene01"
	},
    "dialogs": []
};
});