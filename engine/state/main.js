/*global define */

/**
 * This is the state main.
 * State is responsible for getting/setting state snapshots
 */
define([
    'engine/character/main',
    'engine/panel/main',
    'engine/flags/main'
], function (
    gamecharacter,
    gamepanel,
    gameflags
) {

    var getToJSON = function () {

            // ask each scene to get a state;
            var key,
                scenes = require('engine/scene/main').getAll(),
                sceneStates = {},
                currentSceneName,
                pcState,
                inventoryState,
                flagState;

            for (key in scenes) {
                if (scenes[key].isPlayable()) {
                    sceneStates[key] = scenes[key].getState();
                }
            }

            currentSceneName = require('engine/stage/main').get().getState();
            pcState = gamecharacter.getPc().getState();
            inventoryState = gamepanel.getInventory().getState();
            flagState = gameflags.getState();

            return JSON.stringify({
                'scenes' : sceneStates,
                'currentScene' : currentSceneName,
                'pc' : pcState,
                'inventory' : inventoryState,
                'flags' : flagState
            });
        },

        setFromJSON = function (savegame) {
            var key;
            if (typeof savegame === 'string') {
                savegame = JSON.parse(savegame);
            }

            for (key in savegame.scenes) {
                require('engine/scene/main').get(key).setState(savegame.scenes[key]);
            }

            gameflags.setState(savegame.flags);
            gamecharacter.getPc().setState(savegame.pc);
            gamepanel.getInventory().setState(savegame.inventory);

            require('engine/interaction/action').reset();

            var gamestage = require('engine/stage/main');
            gamestage.get().setState(savegame.currentScene);
            gamestage.activateCursorFor('play');
        };

    return {
        'getToJSON' : getToJSON,
        'setFromJSON' : setFromJSON
    };
});