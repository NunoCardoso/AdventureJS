/*global define, createjs */

/**
 * This module is a game Scene class
 */
define([
    'engine/config',
    'engine/lib/assets',
    'engine/object/main',
    'engine/scene/background',
    'engine/scene/exit'
], function (
    assets,
    config,
    gameobject,
    Background,
    Exit
) {
    var GameScene = function (options) {
        this.initialize(options);
    };

    GameScene.prototype = new createjs.Container();
    GameScene.prototype.GameScene_initialize = GameScene.prototype.initialize;
    GameScene.prototype.initialize = function (scene) {
        this.GameScene_initialize();
        this.name = 'scene.' + scene.id;

        this.description  = scene.description;
        this.interactable = scene.interactable;
        this.ending       = scene.ending;
        this.playableCharacterPosition = null;
        this.background   = null;

        this.objects      = scene.objects || [];
        this.exits        = scene.exits || [];

        if (scene.background) {
            this.background = new Background({
                'background' : scene.background
            });
        }

        this.isInteractable = function () {
            return this.interactable;
        };

        if (scene.playableCharacter) {
            this.playableCharacterPosition = scene.playableCharacter.position;
        }

        // render this scene with the given playableCharacter
        this.render = function (options) {

            if (this.background) {
                this.addChild(this.background);
            }

            var i, o, e;

            for (i = 0; i < this.objects.length; i++) {
                o = gameobject.get(this.objects[i].id);
                o.renderAs('stage');
                o.setDimensions(this.objects[i]);
                if (options.playableCharacter) {
                    o.activateClickListener(options.playableCharacter);
                }
                this.addChild(o);
            }

            for (i = 0; i < this.exits.length; i++) {
                e = new Exit(this.exits[i], scene.id);
                if (options.playableCharacter) {
                    e.activateClickListener(options.playableCharacter);
                }
                this.addChild(e);
            }

            if (options.console) {
                this.addChild(console);
            }

            if (options.playableCharacter) {
                // maybe this isn't true, goind from exits
                options.playableCharacter.x = this.playableCharacterPosition.x;
                options.playableCharacter.y = this.playableCharacterPosition.y;
                this.addChild(options.playableCharacter);
                this.addChild(options.playableCharacter.getLine());
            }
        };
    };
    return GameScene;
});
