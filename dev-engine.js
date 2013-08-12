requirejs.config({
    "paths": {
        "engine" : "/AdvGame/engine",
        "games"  : "/AdvGame/games",
	}
});

// Load the main app module to start the app
requirejs(["engine/main"]);