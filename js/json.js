var gamejson = {
    images: {
		'background01': 'img/background-jungle.jpg',
		'PC01' : 'img/guybrush.png'
    },
    'title' : 'The compass',
    'description' : 'Can you build a compass?',
    'background' : 'background01',
    'PC':{
		'images': 'PC01',
		'frames': {"regX": 0, "height": 150, "count": 18, "regY": 0, "width": 104},
		'animations':{
			'walkright':[0,5,'walkright',6],
			'walkleft':[6,11,'walkleft',6],
			'standright':12,
			'standleft':13
		}
	}
};