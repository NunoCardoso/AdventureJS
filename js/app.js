requirejs.config({
    //    enforceDefine: true,
    "baseUrl": "/AdvGame/js/",
    "paths": {
        "advgame": "/AdvGame/js/advgame",
        "games": "/AdvGame/js/games",
		//"lib": "/js/lib",
        /*"jquery" : "/js/lib/jquery-1.10.0.min",
        "jquery-ui" : [
            "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min",
            "/js/lib/jquery-ui-1.10.3.min"
		]*/
			}//,
        // define dependencies here
		/*"shim": {
        "jquery-ui": ["jquery"],
        "lib/jquery.anytime.min" : ["jquery"],
        "lib/jquery.cookie.min": ["jquery"],
        "lib/jquery.hoverflow.min": ["jquery"],
        "lib/jquery.simplemodal-1.3.5.min" : ["jquery"],
        "lib/jquery.autocomplete" : ["jquery"],
        "lib/jquery.tablesorter.min" : ["jquery"],
        "lib/jquery.tablesorter.filer" : ["jquery"],
        "lib/jquery.tablesorter.pager" : ["jquery"],
        "lib/jquery.jcarousel.min" : ["jquery"],
        "lib/jquery.bt" : ["jquery"]
		}*/
});

// Load the main app module to start the app
requirejs(["advgame/main"]);