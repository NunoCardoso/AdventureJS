/*global define, createjs, $, adv_game_id */

/**
 * This module bootstraps the game, preloads assets, then lands on the main menu
 */
define([
    'engine/achievement/main',
    'engine/character/main',
    'engine/condition/main',
    'engine/config',
    'engine/cursor/main',
    'engine/dialog/main',
    'engine/dialogoption/main',
    'engine/flags/main',
    'engine/game/music',
    'engine/game/preferences',
    'engine/interaction/main',
    'engine/lib/keyboard',
    'engine/menu/main',
    'engine/object/main',
    'engine/panel/main',
    'engine/scene/main',
    'engine/sentence/main',
    'engine/settings',
    'engine/stage/main',
    'engine/start/main'
], function (
    gameachievement,
    gamecharacter,
    gamecondition,
    config,
    gamecursor,
    gamedialog,
    gamedialogoption,
    gameflags,
    gamemusic,
    gamepreferences,
    gameinteraction,
    keyboard,
    gamemenu,
    gameobject,
    gamepanel,
    gamescene,
    gamesentence,
    settings,
    gamestage,
    gamestart
) {
    var Game = function () {

        /**
         * asks gamemenu to render and display
         */

        var _game,
            _user,
            _assetList,
            _options,

            setUser = function (user) {
                _user = user;
            },

            getUser = function () {
                return _user;
            },

            load = function () {
                var d = $.Deferred();
                if (adv_game_id === undefined) {
                    // require(['games/compass/compass'], function (game) {
                    require(['games/aroundtheworld/aroundtheworld'], function (game) {
                        _game = game;
                        d.resolve();
                    });
                } else {
                    $.ajax({
							url: '/adventure-game-handins/app/advgames/' + adv_game_id + '/engine',
                        method: 'GET',
                        success: function (response) {
                            _game = response;
                            d.resolve();
                        },
                        error: function (response) {
                            console.log('can\'t load game.');
                            require(['games/aroundtheworld/aroundtheworld'], function (game) {
                                _game = game;
                                d.resolve();
                            });
                        }
                    });
                }
                return d;
            },

            init = function () {
                _assetList = settings.images.concat(settings.sounds).concat(settings.musics);
                gamecharacter.init(settings.characters);
            },

            render = function (_scene) {
                // vcleanup progress bar
                gamestage.get().removeAllChildren();
                var scene = gamescene.get(_scene);
                scene.render();
                gamescene.add(scene);
                gamestage.get().switchScene(
                    'scene.start',
                    scene.name
                );
                gamemusic.playMenuMusic();
                keyboard.attachEvents();
                gamestage.activate();
                gamestage.update();
            },

            onAssetsLoaded = function () {
                gamepreferences.getPreferences();
                gamecursor.preload();
                gamemenu.preload(_game.main);
                gamecharacter.preload(_game.pc, _game.npcs);
                gameobject.preload(_game.objects);
                gameflags.preload(_game.flags);

                if (_options.role === 'play') {

                    gameinteraction.preload(_game.interactions);
                    gamedialog.preload(_game.dialogs);
                    gamedialogoption.preload(_game.dialogoptions);
                    gamecondition.preload(_game.conditions);
                    gamepanel.preload(_game.panel);
                    gameachievement.preload(_game.achievements);
                    gameachievement.setUser(getUser());
                }

                gamescene.preload(_game.scenes);
                if (!_options.scene) {
                    _options.scene = 'scene.menu';
                }
                gamemusic.setMenuMusic(_game.main.music);
                render(_options.scene);
            },

            /**
             * call that starts the game.
             * Game is started by preloading images, then when done,
             * rendering the main menu
             */
            start = function (options) {
                _options = options;
                var gameAssetList = _game.images.concat(_game.sounds).concat(_game.musics);

                gamestage.preload({
                    canvas : options.canvas || 'canvas',
                    role   : options.role
                });
                config.setCanvasXY({
                    x : $("#canvas").width(),
                    y : $("#canvas").height()
                });

                // make it extra-sharp
                var context = $("#canvas")[0].getContext('2d');
                if (context.webkitImageSmoothingEnabled !== undefined) {
                    context.webkitImageSmoothingEnabled = false;
                }

                var deferred = gamestart.init({
                    'assetList' : _assetList.concat(gameAssetList)
                });

                deferred.done(function () {
                    onAssetsLoaded();
                });
            };

        return {
            'init'    : init,
            'load'    : load,
            'start'   : start,
            'setUser' : setUser,
            'getUser' : getUser
        };
    };

    // tweak String prototype
    if (typeof String.prototype.startsWith !== 'function') {
        String.prototype.startsWith = function (str) {
            return this.slice(0, str.length) === str;
        };
    }
    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (str) {
            return this.slice(-str.length) === str;
        };
    }

    return Game;
});