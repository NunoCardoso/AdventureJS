/*global define, createjs, $ */

/**
 * This module handles main menu stuff
 */
define([
    'engine/assets',
    'engine/gameconfig',
    'engine/gamestage',
    'engine/character/main',
    'engine/console/main',
    'engine/object/main',
    'engine/scene/exit',
    'engine/scene/background',
], function (
    assets,
    gameconfig,
    gamestage,
    playablecharacter,
    gameconsole,
    gameobject,
    Exit,
    Background
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

        if (scene.playableCharacter) {
            this.playableCharacter   = playablecharacter.get();
            this.playableCharacter.x = scene.playableCharacter.position.x;
            this.playableCharacter.y = scene.playableCharacter.position.y;
        }

        // if scene has background... (start scene does not have one)
        if (scene.background) {
            this.background = new Background({
                'background' : scene.background,
                'interactable' : this.interactable,
                'playableCharacter' : this.playableCharacter
            });
            this.addChild(this.background);
        }

        var i;

        if (scene.objects) {
            this.objects = [];
            for (i = 0; i < scene.objects.length; i++) {
                var o = gameobject.get(scene.objects[i].id);
                o.renderAs('stage');
                o.setDimensions(scene.objects[i]);
                o.addListeners();
                this.addChild(o);
            }
        }

        if (scene.exits) {
            this.exits = [];
            for (i = 0; i < scene.exits.length; i++) {
                this.exits[i] = new Exit(scene.exits[i]);
                this.addChild(this.exits[i]);
            }
        }

        if (scene.playableCharacter) {
            this.addChild(this.playableCharacter);
        }

        if (this.interactable) {
            this.addChild(gameconsole.getContainer());
        }
    };
    return GameScene;
});
