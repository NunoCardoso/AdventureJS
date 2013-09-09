requirejs.config({
    "paths": {
        "advgame": "advgame",
        "games"  : "games",
		"editor" : "editor"
	}
});

// Load the main app module to start the app
requirejs(["editor/main"]);