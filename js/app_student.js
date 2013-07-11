requirejs.config({
    "baseUrl": "/AdvGame/js/",
    "paths": {
        "engine" : "/AdvGame/js/engine",
        "games"  : "/AdvGame/js/games",
	}
});

// Load the main app module to start the app
requirejs(["engine/main"]);