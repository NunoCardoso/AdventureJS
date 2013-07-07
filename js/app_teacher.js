requirejs.config({
    "baseUrl": "/AdvGame/js/",
    "paths": {
        "advgame": "/AdvGame/js/advgame",
        "games"  : "/AdvGame/js/games",
		"editor" : "/AdvGame/js/editor",
		"templates" : "/AdvGame/mst"
	}
});

// Load the main app module to start the app
requirejs(["editor/main"]);