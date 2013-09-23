/*global define */

/**
 * This is the state main.
 * State is responsible for getting/setting state snapshots
 */
define([
    'engine/scene/main',
    'engine/stage/main',
    'engine/character/main',
    'engine/panel/main'
], function (
    gamescene,
    gamestage,
    gamecharacter,
    gamepanel
) {

    var getToJSON = function () {

            // ask each scene to get a state;
            var key,
                scenes = gamescene.getAll(),
                sceneStates = {},
                currentSceneName,
                pcState,
                inventoryState;

            for (key in scenes) {
                if (scenes[key].isPlayable()) {
                    sceneStates[key] = scenes[key].getState();
                }
            }

            currentSceneName = gamestage.get().getState();
            pcState = gamecharacter.getPc().getState();
            inventoryState = gamepanel.getInventory().getState();

            return JSON.stringify({
                'scenes' : sceneStates,
                'currentScene' : currentSceneName,
                'pc' : pcState,
                'inventory' : inventoryState
            });
        },

        setFromJSON = function (json) {
            var key,
                savegame = JSON.parse(json);

            for (key in savegame.scenes) {
                gamescene.get(key).setState(savegame.scenes[key]);
            }

            gamecharacter.getPc().setState(savegame.pc);
            gamepanel.getInventory().setState(savegame.inventory);
            gamestage.get().setState(savegame.currentScene);
            // erase actions.
            require('engine/interaction/action').reset();
            require('engine/stage/main').activateCursorFor('play');
        };

    return {
        'getToJSON' : getToJSON,
        'setFromJSON' : setFromJSON
    };
});