requirejs.config({
    "paths": {
        "engine" : "engine",
        "games"  : "games",
	}
});

// Load the main app module to start the app
requirejs(["engine/main"]);