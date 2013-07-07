requirejs.config({
    "baseUrl": "/AdvGame/js/",
    "paths": {
        "advgame": "/AdvGame/js/advgame",
        "games"  : "/AdvGame/js/games",
	}
});

// Load the main app module to start the app
requirejs(["advgame/main"]);