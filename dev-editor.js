requirejs.config({
    "paths": {
        "advgame": "/AdvGame/advgame",
        "games"  : "/AdvGame/games",
		"editor" : "/AdvGame/editor"
	}
});

// Load the main app module to start the app
requirejs(["editor/main"]);